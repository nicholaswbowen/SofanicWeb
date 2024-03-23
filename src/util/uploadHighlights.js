import { doc, writeBatch, getDoc } from "firebase/firestore";

export const uploadHighlights = async (db, user, books) => {
  const userId = user.uid;
  const batch = writeBatch(db);
  const latestUploadBatch = writeBatch(db);
  const processBookhighlights = () =>
    new Promise((resolve, reject) => {
      books.forEach(async ({ title, highlights, id }, index) => {
        const bookRef = doc(db, 'books', id);
        const bookQuerySnapshot = await getDoc(bookRef);
        if (!bookQuerySnapshot.exists()) {
          // new book, so upload everything
          batch.set(bookRef,{
            title,
            shouldGenerateFlashCards: true,
            userId,
          });
          latestUploadBatch.update(bookRef,{
            latestUpload: new Date().toISOString(),
          });
          highlights.forEach(async (highlight) => {
            const highlightRef = doc(db, `books/${id}/highlights/${highlight.id}`);
            batch.set(highlightRef,{ ...highlight, userId });
          });
        } else {
          // If book data for the uploaded book is already there,
          // just upload the new highlights.
          highlights.forEach(async (highlight) => {
            const highlightRef = doc(db, `books/${id}/highlights/${highlight.id}`);
            batch.set(highlightRef, { ...highlight, userId });
          });
          latestUploadBatch.update(bookRef,{
            latestUpload: new Date().toISOString(),
          });
        }
        
        if (index === Object.entries(books).length - 1) {
          resolve("all highlights processed");
        }
      });
    });
  await processBookhighlights();
  await batch.commit(db);
  await latestUploadBatch.commit(db)
  return { text: "new highlights added" };
};
