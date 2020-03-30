import moment from "moment";

const sortByDate = order => (a, b) => {
  const dateA = moment(a[order]);
  const dateB = moment(b[order]);

  if (dateA.diff(dateB) > 1) {
    return -1;
  }

  if (dateA.diff(dateB) < 0) {
    return 1;
  }

  return 0;
};

const sortByString = order => (a, b) => {
  if (b[order] > a[order]) {
    return -1;
  }
  if (b[order] < a[order]) {
    return 1;
  }
  return 0;
};

const sortByVote = order => (a, b) => {
  const dataA = a.upvote - a.downvote;
  const dataB = b.upvote - b.downvote;
  if (dataA > dataB) return -1;
  if (dataA < dataB) return 1;
  return 0;
};

export const filterByTags = (posts, selectedTags) => {
  if (!posts || !posts.length) {
    return [];
  }
  const newPosts = [...posts];
  if (!selectedTags || !selectedTags.length) {
    return newPosts;
  }

  let filteredPosts = newPosts;
  for (let tag of selectedTags) {
    filteredPosts = filteredPosts.filter(post =>
      post.tags
        .split(",")
        .map(tag => tag.trim())
        .includes(tag)
    );
  }
  return filteredPosts;
};

export const orderPosts = (posts, options) => {
  if (!posts || !posts.length) {
    return [];
  }

  const newPosts = [...posts];
  const orderOptions = Object.keys(options);
  if (!orderOptions.length) {
    return newPosts;
  }

  let orderedPosts = newPosts;
  for (let order of orderOptions) {
    if (order === "created" && options[order] === 1) {
      orderedPosts = orderedPosts.sort(sortByDate(order));
    }
    if (order === "title" && options[order] === 1) {
      orderedPosts = orderedPosts.sort(sortByString(order));
    }
    if (order === "popularity" && options[order] === 1) {
      orderedPosts = orderedPosts.sort(sortByVote(order));
    }
  }

  return orderedPosts;
};
