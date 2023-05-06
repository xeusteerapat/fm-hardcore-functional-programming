/**
 * Task
 */
const Task = fork => ({
  fork,
  ap: other =>
    Task((rej, res) => fork(rej, f => other.fork(rej, x => res(f(x))))),
  map: f => Task((rej, res) => fork(rej, x => res(f(x)))),
  chain: f => Task((rej, res) => fork(rej, x => f(x).fork(rej, res))),
  concat: other =>
    Task((rej, res) =>
      fork(rej, x =>
        other.fork(rej, y => {
          console.log('X', x, 'Y', y);
          res(x.concat(y));
        })
      )
    ),
  fold: (f, g) =>
    Task((rej, res) =>
      fork(
        x => f(x).fork(rej, res),
        x => g(x).fork(rej, res)
      )
    ),
});
Task.of = x => Task((rej, res) => res(x));
Task.rejected = x => Task((rej, res) => rej(x));
Task.fromPromised =
  fn =>
  (...args) =>
    Task((rej, res) =>
      fn(...args)
        .then(res)
        .catch(rej)
    );

const taskOfTwo = Task.of(2)
  .map(two => two)
  .fold(
    () => 'No task',
    res => res()
  );
console.log(taskOfTwo);

const taskOfOne = Task((rej, res) => res(2))
  .map(two => two + 2)
  .map(four => four * 4);
taskOfOne.fork(console.error, console.log); // 16

const taskOfThree = Task((rej, res) => res(3))
  .chain(two => Task.of(two + 2))
  .map(four => four * 4);
taskOfThree.fork(console.error, console.log); // 20

// Refactor file system in Either lesson with Task
const fs = require('fs');

// Traditional approach
const app_ = () =>
  fs.readFile(__dirname + '/config.json', 'utf-8', (err, contents) => {
    console.log({ err, contents });

    if (err) throw err;

    const newContents = contents.replace(/3/g, '6');

    fs.writeFile('newConfig.json', newContents, (err, _) => {
      if (err) throw err;

      console.log('Success! 🎉');
    });
  });

// Read-file and Write-file Tasks helper
const readFile = (path, encoding) =>
  Task((rej, res) =>
    fs.readFile(path, encoding, (err, contents) =>
      err ? rej(err) : res(contents)
    )
  );

const writeFile = (path, contents) =>
  Task((rej, res) =>
    fs.writeFile(path, contents, (err, contents) =>
      err ? rej(err) : res(contents)
    )
  );

const app = () =>
  readFile(__dirname + '/config.json', 'utf-8')
    .map(contents => contents.replace(/3/g, '5'))
    .chain(newContents => writeFile('newConfig1.json', newContents));

app().fork(console.error, () => console.log('Success with Task! 🚀'));
