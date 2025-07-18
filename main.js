import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

let lastVisible = null;
const pageSize = 5; // how many messages to load per batch

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedback-form");
  const messagesList = document.getElementById("messages-list");
  const responseMessage = document.getElementById("response-message");
  const loadMoreBtn = document.getElementById("load-more-btn");

  async function loadMessages(initial = false) {
    let q = query(
      collection(db, "guestbook"),
      orderBy("timestamp", "desc"),
      limit(pageSize)
    );

    if (!initial && lastVisible) {
      q = query(
        collection(db, "guestbook"),
        orderBy("timestamp", "desc"),
        startAfter(lastVisible),
        limit(pageSize)
      );
    }

    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    docs.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement("div");
      item.classList.add("message-card");
      item.innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>${data.message}</p>
        <hr />
      `;
      messagesList.appendChild(item);
    });

    if (docs.length > 0) {
      lastVisible = docs[docs.length - 1];
    } else {
      loadMoreBtn.style.display = "none";
    }
  }

  // Initial load
  loadMessages(true);

  // Handle Load More button
  loadMoreBtn.addEventListener("click", () => {
    loadMessages(false);
  });

  // Handle form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      await addDoc(collection(db, "guestbook"), {
        name,
        email,
        message,
        timestamp: new Date()
      });
      responseMessage.textContent = "Message sent!";
      form.reset();

      // Clear list and reload first page
      messagesList.innerHTML = "";
      lastVisible = null;
      loadMoreBtn.style.display = "block";
      loadMessages(true);
    } catch (error) {
      responseMessage.textContent = "Error: " + error.message;
    }
  });
});
