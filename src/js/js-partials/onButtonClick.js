let currentActiveBtn = "";
let fetch = {};
// const queue = {};
// const watched = {};
const allWatched = [];
const allQueue = [];

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

// const remove = key => {
//   localStorage.removeItem(key);
// };

export function createConst(obj) {
  fetch = obj;
}

function addWatched() {
  const addWatchedBtn = document.querySelector(".btn-watch");
  addWatchedBtn.addEventListener("click", onAddWatchedClick);
}

function onAddWatchedClick(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  currentActiveBtn = document.querySelector(".modal__button-active");

  e.currentTarget.textContent = "Remove from watched";
  e.currentTarget.classList.toggle("modal__button-active");
  const savedLocalInfo = load("allWatchedMovies");

  if (currentActiveBtn) {
    e.currentTarget.textContent = "add to Watched";
    let index;
    savedLocalInfo.forEach(({ id }, i) => (id === fetch.id ? (index = i) : i));
    allWatched.splice(index, 1);
    save(`allWatchedMovies`, allWatched);
  }

  const isInArray = savedLocalInfo
    ? savedLocalInfo.find(({ id }) => id === fetch.id)
    : false;

  if (!!isInArray) {
    return;
  }

  // save(`watchedMovies`, fetch);

  allWatched.push(fetch);
  save(`allWatchedMovies`, allWatched);
}

function addQueue() {
  const addWatchedBtn = document.querySelector(".btn-queue");
  addWatchedBtn.addEventListener("click", onAddQueueClick);
}

function onAddQueueClick(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  currentActiveBtn = document.querySelector(".modal__button-active");

  e.currentTarget.textContent = "Remove from Queue";
  e.currentTarget.classList.toggle("modal__button-active");
  const savedLocalInfo = load("allQueueMovies");

  if (currentActiveBtn) {
    e.currentTarget.textContent = "add to Queue";
    let index;
    savedLocalInfo.forEach(({ id }, i) => (id === fetch.id ? (index = i) : i));
    allQueue.splice(index, 1);
    save(`allWatchedMovies`, allQueue);
  }

  const isInArray = savedLocalInfo
    ? savedLocalInfo.find(({ id }) => id === fetch.id)
    : false;

  if (!!isInArray) {
    return;
  }

  allQueue.push(fetch);
  save(`allQueueMovies`, allQueue);
}

export { addWatched, addQueue };
