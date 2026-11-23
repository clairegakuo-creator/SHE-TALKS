// 1. API endpoints and settings
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "openrouter/free";
const MAX_CHARS = 280;

// 2. Your logged-in user profile (shown when clicking "Profile")
const LOGGED_IN_USER = {
  id: 999,
  name: "Maya Lin",
  username: "maya_shetalks",
  email: "maya@shetalks.space",
  website: "shetalks.space",
  bio: "Building SHE TALKS for women's health, careers, businesses, talents, and real stories.",
  company: { name: "SHE TALKS Collective" },
  address: { city: "Nyeri" },
  followers: 640,
  following: 215,
  isCurrentUser: true
};

// 3. Only 8 women's profiles (including Avery Kings as artist and Claire Martins as baker)
const EIGHT_PROFILES = [
  {
    name: "Avery Kings",
    username: "averykings",
    bio: "Visual artist and painter sharing colorful art and creative confidence.",
    companyName: "Kings Art Studio",
    city: "Austin",
    website: "averykings.art",
    email: "avery@kingsart.co",
    followers: 1820,
    following: 340
  },
  {
    name: "Claire Martins",
    username: "clairemartins",
    bio: "Baker and pastry founder making sourdough and tarts. Sharing real kitchen lessons.",
    companyName: "Martins Oven & Bakehouse",
    city: "Toronto",
    website: "clairemartins.bake",
    email: "claire@martinsobakehouse.com",
    followers: 2490,
    following: 412
  },
  {
    name: "Jael Vance",
    username: "jaelvance",
    bio: "Women's health educator and community organizer. Rest is essential.",
    companyName: "HerWellness Hub",
    city: "Accra",
    website: "jaelvance.org",
    email: "jael@herwellness.org",
    followers: 3110,
    following: 505
  },
  {
    name: "Nadia Okafor",
    username: "nadiaokafor",
    bio: "Software engineer helping women grow in tech careers and leadership.",
    companyName: "Okafor Tech Labs",
    city: "London",
    website: "nadiaokafor.dev",
    email: "nadia@okafor.dev",
    followers: 1540,
    following: 289
  },
  {
    name: "Zoe Castellanos",
    username: "zoecastellanos",
    bio: "Ceramic artist sharing honest tips on pricing handmade work.",
    companyName: "Zoe Clay & Form",
    city: "Chicago",
    website: "zoecastellanos.art",
    email: "zoe@zoecastellanos.art",
    followers: 980,
    following: 318
  },
  {
    name: "Hana Al-Mansoor",
    username: "hana_writes",
    bio: "Finance coach helping women build savings, side businesses, and smart habits.",
    companyName: "BrightLedger Women",
    city: "Lagos",
    website: "hanaalmansoor.com",
    email: "hana@brightledger.io",
    followers: 2760,
    following: 198
  },
  {
    name: "Amara Nwosu",
    username: "amaranwosu",
    bio: "Spoken-word writer and youth mentor championing everyday activism.",
    companyName: "Voice & Verse",
    city: "Atlanta",
    website: "amaranwosu.com",
    email: "amara@voiceandverse.com",
    followers: 1150,
    following: 375
  },
  {
    name: "Camila Reyes",
    username: "camilareyes",
    bio: "Storyteller sharing real stories on boundaries, wellness, and balance.",
    companyName: "Reyes Wordcraft",
    city: "Denver",
    website: "camilareyes.co",
    email: "camila@reyeswordcraft.co",
    followers: 890,
    following: 250
  }
];

// 4. Community posts for SHE TALKS
const POST_TOPICS = [
  {
    title: "Why I share rough sketches too",
    body: "Waiting for a painting to look perfect kept me quiet for months. Sharing early sketches connected me with artists and supporters who love seeing the process."
  },
  {
    title: "4 AM ovens and real bakery math",
    body: "Baking looks cozy online until you weigh flour, price butter, and track oven hours at 4 AM. Tracking every batch taught me that craft still needs clear numbers."
  },
  {
    title: "Booking health checkups before burnout",
    body: "Many women push through tiredness or pain because others depend on them. Asking clear questions at a clinic is healthy self-care."
  },
  {
    title: "Writing down career wins all year",
    body: "Keep a simple note of problems you solved and tasks you finished. When salary or promotion chats happen, calm facts speak for you."
  },
  {
    title: "Pricing handmade work with confidence",
    body: "Raising my ceramic prices after a hard month eased my stress and attracted buyers who respect the work."
  },
  {
    title: "Starting a small savings habit",
    body: "You do not need a big amount to begin saving. Moving even a small set amount on payday builds confidence and choices over time."
  },
  {
    title: "Everyday activism in meetings",
    body: "Advocacy happens in small daily moments—like repeating a teammate's point when she gets interrupted or speaking up for fair rules."
  },
  {
    title: "Setting boundaries without long apologies",
    body: "A polite, clear boundary is enough. You do not owe anyone a long story every time your schedule is full."
  }
];

// 5. Friendly, funny, and helpful English comments
const COMMENT_TOPICS = [
  {
    name: "Sienna Brooks",
    email: "sienna@shetalks.space",
    body: "Process sketches are the best! Seeing how a piece starts makes everyone else braver to begin."
  },
  {
    name: "Lola Fernandez",
    email: "lola@shetalks.space",
    body: "4 AM ovens and spreadsheets? Respect! Save me one warm croissant for science."
  },
  {
    name: "Kendra Cole",
    email: "kendra@shetalks.space",
    body: "Your body gives gentle hints before it shouts. Booking that checkup is smart energy."
  },
  {
    name: "Mei Zhang",
    email: "mei@shetalks.space",
    body: "A weekly wins list saved me from forgetting half my own work during review talks."
  },
  {
    name: "Naomi Mensah",
    email: "naomi@shetalks.space",
    body: "Facts! Fair pricing helps you enjoy your craft instead of feeling drained."
  },
  {
    name: "Chloe Park",
    email: "chloe@shetalks.space",
    body: "Small steady habits beat giant plans that stay in a notebook. Love this!"
  }
];

// 6. State variables
let users = [];
let posts = [];
let commentsByPostId = {};
let openCommentIds = [];
let followingIds = [];

let chatHistory = [
  {
    role: "system",
    content: "You are a helpful assistant inside SHE TALKS, a women's community app covering health, careers, businesses, talents, real stories, advice, and activism."
  }
];

// 7. DOM elements
const statusArea = document.getElementById("status-area");
const homeView = document.getElementById("home-view");
const profileView = document.getElementById("profile-view");
const pageTitle = document.getElementById("page-title");
const feedList = document.getElementById("feed-list");
const whoToFollowList = document.getElementById("who-to-follow-list");

const navHome = document.getElementById("nav-home");
const navProfile = document.getElementById("nav-profile");
const navAi = document.getElementById("nav-ai");

const composeForm = document.getElementById("compose-form");
const tweetInput = document.getElementById("tweet-input");
const charCounter = document.getElementById("char-counter");
const postBtn = document.getElementById("post-btn");

const aiFab = document.getElementById("ai-fab");
const aiPanel = document.getElementById("ai-panel");
const aiCloseBtn = document.getElementById("ai-close-btn");
const aiMessages = document.getElementById("ai-messages");
const aiForm = document.getElementById("ai-form");
const aiPromptInput = document.getElementById("ai-prompt-input");
const keyInput = document.getElementById("openrouter-key-input");
const saveKeyBtn = document.getElementById("save-key-btn");

// 8. Avatar initials + optional image URL fallback
function getInitials(name) {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarColor(id) {
  const colors = ["#fce7f3", "#e0f2fe", "#dcfce7", "#ffedd5", "#f3e8ff"];
  return colors[Math.abs(Number(id) || 0) % colors.length];
}

// Optional image hook: return a URL string if using an avatar API,
// or leave as null to show colored initials (with fallback if an image fails).
function getAvatarImageUrl(user) {
  return null;
}

function createAvatarHtml(user, extraClass) {
  const initials = getInitials(user.name);
  const bg = getAvatarColor(user.id);
  const imgUrl = getAvatarImageUrl(user);
  const classes = extraClass ? "avatar-circle " + extraClass : "avatar-circle";

  if (imgUrl) {
    return (
      '<div class="' + classes + '" style="background:' + bg + '">' +
      '<img src="' + imgUrl + '" alt="' + user.name + '" onerror="this.parentElement.textContent=\'' + initials + '\'" />' +
      "</div>"
    );
  }

  return '<div class="' + classes + '" style="background:' + bg + '">' + initials + "</div>";
}

function findUser(userId) {
  if (userId === LOGGED_IN_USER.id) return LOGGED_IN_USER;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) return users[i];
  }
  return {
    id: userId,
    name: "SHE TALKS Member",
    username: "member",
    email: "N/A",
    website: "N/A",
    bio: "SHE TALKS member.",
    company: { name: "SHE TALKS" },
    address: { city: "N/A" },
    followers: 0,
    following: 0
  };
}

// 9. Loading and error states
function showLoading() {
  statusArea.classList.remove("hidden");
  statusArea.innerHTML = '<div class="spinner"></div><p>Loading posts and users...</p>';
}

function showError(message) {
  statusArea.classList.remove("hidden");
  statusArea.innerHTML = '<div class="error-box">Error: ' + message + "</div>";
}

function hideStatus() {
  statusArea.classList.add("hidden");
  statusArea.innerHTML = "";
}

// 10. Parallel fetch with Promise.all (8 profiles)
async function startSheTalks() {
  const savedKey = localStorage.getItem("shetalks_openrouter_key");
  if (savedKey) keyInput.value = savedKey;

  showLoading();

  try {
    const [usersRes, postsRes] = await Promise.all([
      fetch(USERS_URL),
      fetch(POSTS_URL)
    ]);

    if (!usersRes.ok || !postsRes.ok) {
      throw new Error("Could not load users or posts.");
    }

    const rawUsers = await usersRes.json();
    const rawPosts = await postsRes.json();

    // Build exactly 8 profiles using API IDs where available
    users = [];
    for (let i = 0; i < EIGHT_PROFILES.length; i++) {
      const profile = EIGHT_PROFILES[i];
      const apiId = rawUsers[i] ? rawUsers[i].id : i + 1;
      users.push({
        id: apiId,
        name: profile.name,
        username: profile.username,
        email: profile.email,
        website: profile.website,
        bio: profile.bio,
        company: { name: profile.companyName },
        address: { city: profile.city },
        followers: profile.followers,
        following: profile.following
      });
    }

    // Assign posts across the 8 profiles
    posts = [];
    for (let i = 0; i < rawPosts.length; i++) {
      const apiPost = rawPosts[i];
      const topic = POST_TOPICS[i % POST_TOPICS.length];
      const author = users[i % users.length];

      posts.push({
        id: apiPost.id,
        userId: author.id,
        title: topic.title,
        body: topic.body,
        liked: false,
        likes: (apiPost.id * 3) % 30 + 2,
        retweeted: false,
        retweets: (apiPost.id * 2) % 12
      });
    }

    hideStatus();
    renderWhoToFollow();
    renderFeed();
    loadCommentsOnce();
  } catch (err) {
    showError(err.message || "Failed to load feed.");
  }
}

// 11. Fetch comments once and group by postId
async function loadCommentsOnce() {
  try {
    const res = await fetch(COMMENTS_URL);
    if (!res.ok) return;

    const rawComments = await res.json();
    commentsByPostId = {};

    for (let i = 0; i < rawComments.length; i++) {
      const c = rawComments[i];
      const sample = COMMENT_TOPICS[i % COMMENT_TOPICS.length];
      if (!commentsByPostId[c.postId]) {
        commentsByPostId[c.postId] = [];
      }
      commentsByPostId[c.postId].push({
        id: c.id,
        postId: c.postId,
        name: sample.name,
        email: sample.email,
        body: sample.body
      });
    }

    renderFeed();
  } catch (err) {
    console.log("Comments error:", err);
  }
}

// 12. Feed and post card rendering + actions
function renderFeed() {
  feedList.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    feedList.appendChild(createPostCard(posts[i]));
  }
}

function createPostCard(post) {
  const author = findUser(post.userId);
  const postComments = commentsByPostId[post.id] || [];
  const isOpen = openCommentIds.includes(post.id);

  let commentsHtml = "";
  if (isOpen) {
    if (postComments.length === 0) {
      commentsHtml = '<div class="comments-box"><p class="author-handle">No comments yet.</p></div>';
    } else {
      let items = "";
      for (let i = 0; i < postComments.length; i++) {
        const cm = postComments[i];
        items +=
          '<div class="comment-item">' +
          '<div class="comment-author">' + cm.name + ' <span class="author-handle">(' + cm.email + ")</span></div>" +
          "<div>" + cm.body + "</div>" +
          "</div>";
      }
      commentsHtml = '<div class="comments-box">' + items + "</div>";
    }
  }

  const card = document.createElement("article");
  card.className = "post-card";
  card.innerHTML =
    createAvatarHtml(author, "clickable-user") +
    '<div class="post-content">' +
      '<div class="post-header">' +
        '<span class="author-name clickable-user">' + author.name + "</span>" +
        '<span class="author-handle">@' + author.username + "</span>" +
      "</div>" +
      '<div class="post-title">' + post.title + "</div>" +
      '<p class="post-body">' + post.body + "</p>" +
      '<div class="post-actions">' +
        '<button type="button" class="action-btn comment-btn">Comments (' + postComments.length + ")</button>" +
        '<button type="button" class="action-btn like-btn ' + (post.liked ? "active" : "") + '">Like (' + post.likes + ")</button>" +
        '<button type="button" class="action-btn retweet-btn ' + (post.retweeted ? "active" : "") + '">Retweet (' + post.retweets + ")</button>" +
        '<button type="button" class="action-btn summarize-btn">Summarize with AI</button>' +
      "</div>" +
      commentsHtml +
    "</div>";

  card.querySelectorAll(".clickable-user").forEach(function (el) {
    el.addEventListener("click", function () {
      openProfile(author.id);
    });
  });

  card.querySelector(".comment-btn").addEventListener("click", function () {
    const idx = openCommentIds.indexOf(post.id);
    if (idx === -1) {
      openCommentIds.push(post.id);
    } else {
      openCommentIds.splice(idx, 1);
    }
    renderFeed();
  });

  card.querySelector(".like-btn").addEventListener("click", function () {
    post.liked = !post.liked;
    post.likes = post.liked ? post.likes + 1 : post.likes - 1;
    renderFeed();
  });

  card.querySelector(".retweet-btn").addEventListener("click", function () {
    post.retweeted = !post.retweeted;
    post.retweets = post.retweeted ? post.retweets + 1 : post.retweets - 1;
    renderFeed();
  });

  card.querySelector(".summarize-btn").addEventListener("click", function () {
    summarizePost(post, author, postComments);
  });

  return card;
}

// 13. Who to follow box
function renderWhoToFollow() {
  whoToFollowList.innerHTML = "";
  const suggested = users.slice(0, 3);

  for (let i = 0; i < suggested.length; i++) {
    const user = suggested[i];
    const isFollowing = followingIds.includes(user.id);
    const row = document.createElement("div");
    row.className = "follow-row";

    row.innerHTML =
      createAvatarHtml(user, "clickable-user") +
      '<div class="follow-meta">' +
        '<div class="author-name clickable-user">' + user.name + "</div>" +
        '<div class="author-handle">@' + user.username + "</div>" +
      "</div>" +
      '<button type="button" class="primary-btn follow-btn">' + (isFollowing ? "Following" : "Follow") + "</button>";

    row.querySelectorAll(".clickable-user").forEach(function (el) {
      el.addEventListener("click", function () {
        openProfile(user.id);
      });
    });

    row.querySelector(".follow-btn").addEventListener("click", function () {
      toggleFollow(user.id);
      renderWhoToFollow();
    });

    whoToFollowList.appendChild(row);
  }
}

function toggleFollow(userId) {
  const idx = followingIds.indexOf(userId);
  if (idx === -1) {
    followingIds.push(userId);
  } else {
    followingIds.splice(idx, 1);
  }
}

// 14. Compose box (280-character limit and add new post to top)
function updateCounter() {
  const left = MAX_CHARS - tweetInput.value.length;
  charCounter.textContent = left;
  charCounter.classList.toggle("over-limit", left < 0);
  postBtn.disabled = tweetInput.value.trim().length === 0 || left < 0;
}

updateCounter();
tweetInput.addEventListener("input", updateCounter);

composeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = tweetInput.value.trim();
  if (!text || text.length > MAX_CHARS) return;

  posts.unshift({
    id: Date.now(),
    userId: LOGGED_IN_USER.id,
    title: text.slice(0, 60),
    body: text,
    liked: false,
    likes: 0,
    retweeted: false,
    retweets: 0
  });

  tweetInput.value = "";
  updateCounter();
  openHome();
});

// 15. Navigation and Profile page
function openHome() {
  pageTitle.textContent = "Home";
  homeView.classList.remove("hidden");
  profileView.classList.add("hidden");
  navHome.classList.add("active");
  navProfile.classList.remove("active");
  renderFeed();
}

function openProfile(userId) {
  const user = findUser(userId);
  pageTitle.textContent = user.name;
  homeView.classList.add("hidden");
  profileView.classList.remove("hidden");

  if (user.isCurrentUser) {
    navHome.classList.remove("active");
    navProfile.classList.add("active");
  }

  const userPosts = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].userId === user.id) userPosts.push(posts[i]);
  }

  const isFollowing = followingIds.includes(user.id);
  const followerCount = (user.followers || 0) + (isFollowing ? 1 : 0);

  profileView.innerHTML =
    '<div class="cover-banner"></div>' +
    '<div class="profile-body">' +
      '<div class="profile-top-row" id="profile-top-row">' +
        createAvatarHtml(user, "profile-avatar") +
      "</div>" +
      '<div class="profile-name">' + user.name + "</div>" +
      '<div class="profile-handle">@' + user.username + "</div>" +
      '<p class="profile-bio">' + (user.bio || "SHE TALKS member.") + "</p>" +
      '<div class="profile-details">' +
        "<div>Company: " + (user.company ? user.company.name : "N/A") + "</div>" +
        "<div>City: " + (user.address ? user.address.city : "N/A") + "</div>" +
        "<div>Website: " + (user.website || "N/A") + "</div>" +
        "<div>Email: " + (user.email || "N/A") + "</div>" +
      "</div>" +
      '<div class="profile-stats">' +
        "<span><strong>" + (user.following || 0) + "</strong> Following</span>" +
        "<span><strong>" + followerCount + "</strong> Followers</span>" +
        "<span><strong>" + userPosts.length + "</strong> Posts</span>" +
      "</div>" +
      '<h2 class="profile-posts-heading">Posts by ' + user.name.split(" ")[0] + "</h2>" +
      '<div id="profile-posts-list"></div>' +
    "</div>";

  if (!user.isCurrentUser) {
    const followBtn = document.createElement("button");
    followBtn.type = "button";
    followBtn.className = "primary-btn";
    followBtn.textContent = isFollowing ? "Following" : "Follow";
    followBtn.addEventListener("click", function () {
      toggleFollow(user.id);
      renderWhoToFollow();
      openProfile(user.id);
    });
    document.getElementById("profile-top-row").appendChild(followBtn);
  }

  const profilePostsEl = document.getElementById("profile-posts-list");
  for (let i = 0; i < userPosts.length; i++) {
    profilePostsEl.appendChild(createPostCard(userPosts[i]));
  }
}

navHome.addEventListener("click", openHome);
navProfile.addEventListener("click", function () {
  openProfile(LOGGED_IN_USER.id);
});

// 16. Floating AI chat panel with OpenRouter ("openrouter/free")
function openAiPanel() {
  aiPanel.classList.remove("hidden");
}

function closeAiPanel() {
  aiPanel.classList.add("hidden");
}

aiFab.addEventListener("click", function () {
  if (aiPanel.classList.contains("hidden")) {
    openAiPanel();
  } else {
    closeAiPanel();
  }
});

navAi.addEventListener("click", openAiPanel);
aiCloseBtn.addEventListener("click", closeAiPanel);

saveKeyBtn.addEventListener("click", function () {
  const key = keyInput.value.trim();
  if (!key) {
    addChatBubble("assistant", "Please paste an OpenRouter API key before clicking Save.");
    return;
  }
  localStorage.setItem("shetalks_openrouter_key", key);
  addChatBubble("assistant", "API key saved.");
});

function addChatBubble(sender, text, id) {
  const div = document.createElement("div");
  div.className = "ai-msg " + sender;
  div.textContent = text;
  if (id) div.id = id;
  aiMessages.appendChild(div);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

async function sendToOpenRouter(promptText, visibleText) {
  const apiKey = (localStorage.getItem("shetalks_openrouter_key") || "").trim();
  if (!apiKey) {
    openAiPanel();
    addChatBubble("assistant", "Please enter your OpenRouter API key above first.");
    return;
  }

  openAiPanel();
  addChatBubble("user", visibleText);

  chatHistory.push({ role: "user", content: promptText });
  addChatBubble("assistant", "Thinking...", "ai-thinking");

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: chatHistory
      })
    });

    const data = await res.json();
    const thinkingEl = document.getElementById("ai-thinking");
    if (thinkingEl) thinkingEl.remove();

    if (!res.ok) {
      const msg = data && data.error && data.error.message ? data.error.message : "AI request failed";
      throw new Error(msg);
    }

    const reply = data.choices[0].message.content;
    chatHistory.push({ role: "assistant", content: reply });
    addChatBubble("assistant", reply);
  } catch (err) {
    const thinkingEl = document.getElementById("ai-thinking");
    if (thinkingEl) thinkingEl.remove();
    addChatBubble("assistant", "Error: " + err.message);
  }
}

function summarizePost(post, author, postComments) {
  let commentsText = "No comments.";
  if (postComments.length > 0) {
    commentsText = "";
    for (let i = 0; i < postComments.length; i++) {
      commentsText += (i + 1) + ". " + postComments[i].name + ": " + postComments[i].body + "\n";
    }
  }

  const prompt =
    "Summarize this post and its comments:\n" +
    "Author: " + author.name + " (@" + author.username + ")\n" +
    "Title: " + post.title + "\n" +
    "Post: " + post.body + "\n" +
    "Comments:\n" + commentsText;

  sendToOpenRouter(prompt, "Summarize " + author.name + "'s post");
}

aiForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const question = aiPromptInput.value.trim();
  if (!question) return;
  aiPromptInput.value = "";
  sendToOpenRouter(question, question);
});

// Start the app
startSheTalks();