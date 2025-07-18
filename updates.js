import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const updatesList = document.getElementById("updates-list");

  try {
    const updatesRef = collection(db, "projectUpdates");
    const q = query(updatesRef, orderBy("timestamp", "desc")); // newest first
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      updatesList.innerHTML = "<p>No updates yet.</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.classList.add("update-card");

      card.innerHTML = `
        <h3>${data.title || "Untitled Update"}</h3>
        <p>${data.content || ""}</p>
        <small><em>${new Date(data.timestamp?.toDate()).toLocaleString()}</em></small>
      `;

      updatesList.appendChild(card);
    });
  } catch (error) {
    updatesList.innerHTML = `<p>Error loading updates: ${error.message}</p>`;
  }
});
