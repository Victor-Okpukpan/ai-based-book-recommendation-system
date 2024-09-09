export const getGoogleBooksInfo = async (titlesArr) => {

	console.log('Received input for getGoogleBooksInfo:', titlesArr);
console.log('Is array:', Array.isArray(titlesArr));
   // Check if titlesArr is an array
   if (!Array.isArray(titlesArr)) {
    console.error('getGoogleBooksInfo received non-array input:', titlesArr);
    return [];
  }

  // Ensure each item in the array has a title property
  return await Promise.all(titlesArr.map(async ({title}) => {
    if (!title) {
      console.warn('Skipping item without title:', {title});
      return null;
    }

    try {
      let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&langRestrict=en&maxResults=1`);
      if (response.ok) {
        response = await response.json();
        const bookObj = response.items && response.items[0];
        if (!bookObj) {
          console.warn('No book info found for:', title);
          return null;
        }

        return {
          title,
          subtitle: bookObj.volumeInfo && bookObj.volumeInfo.subtitle,
          genre: (bookObj.volumeInfo && bookObj.volumeInfo.categories && bookObj.volumeInfo.categories[0]) || "NA",
          authors: bookObj.volumeInfo && bookObj.volumeInfo.authors,
          summary: bookObj.volumeInfo && bookObj.volumeInfo.description,
          publisher: bookObj.volumeInfo && bookObj.volumeInfo.publisher,
          image: bookObj.volumeInfo && bookObj.volumeInfo.imageLinks && bookObj.volumeInfo.imageLinks.thumbnail || "",
          isbn10: bookObj.volumeInfo && bookObj.volumeInfo.industryIdentifiers 
            ? getIsbn10(bookObj.volumeInfo.industryIdentifiers)
            : undefined,
        };
      } else {
        console.error(`Failed to fetch book info for ${title}. Status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching book info for ${title}:`, error);
      return null;
    }
  }));
};

const getIsbn10 = (industryIdentifiers) => {
  if (!Array.isArray(industryIdentifiers)) {
    console.warn('getIsbn10 received non-array input:', industryIdentifiers);
    return undefined;
  }
  for (const identifier of industryIdentifiers) {
    if (identifier.type === "ISBN_10") {
      return identifier.identifier;
    }
  }
  console.warn('No ISBN_10 found in:', industryIdentifiers);
  return undefined;
};
