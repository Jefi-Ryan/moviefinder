import { Client, TablesDB, Query, ID } from 'appwrite';

const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;  

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(APPWRITE_PROJECT_ID); 

const tablesDB = new TablesDB(client);

export const updateAppwriteSearchTerm = async (searchTerm, movie) => {
    try{
        const result = await tablesDB.listRows({
                            databaseId: APPWRITE_DATABASE_ID,
                            tableId: APPWRITE_COLLECTION_ID,
                            queries: [
                                Query.equal('searchTerm', searchTerm)
                            ]
                        });
        console.log(result.rows);

        if(result.rows.length > 0) {
            const movieInfo = result.rows[0];
            await tablesDB.updateRow({
                databaseId: APPWRITE_DATABASE_ID,
                tableId: APPWRITE_COLLECTION_ID,
                rowId: movieInfo.$id,
                data: {
                    count: movieInfo.count + 1,
                    posterURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            });
        } else {
            await tablesDB.createRow({
                databaseId: APPWRITE_DATABASE_ID,
                tableId: APPWRITE_COLLECTION_ID,
                rowId: ID.unique(),
                data: {
                    searchTerm: searchTerm,
                    posterURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    count: 1,
                    movieId: movie.id
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

export const getTopAppwriteSearchTerms = async () => {
    try {
        const result = await tablesDB.listRows({
            databaseId: APPWRITE_DATABASE_ID,
            tableId: APPWRITE_COLLECTION_ID,
            queries: [
                Query.orderDesc('count'),
                Query.limit(5)
            ]
        });
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
};
