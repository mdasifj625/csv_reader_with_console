import config from '../core/config';
import CsvHelper, { Book, Magazines, Authors } from '../helper/csvHelper';
class CsvController {
	private async readBook(): Promise<Book[]> {
		try {
			const books = await CsvHelper.readCsvFile(config.csvUrl.books);
			return books as Book[];
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	private async readMagazines(): Promise<Magazines[]> {
		try {
			const magazines = await CsvHelper.readCsvFile(
				config.csvUrl.magazines
			);
			return magazines as Magazines[];
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	private async readAuthors(): Promise<Authors[]> {
		try {
			const authors = await CsvHelper.readCsvFile(config.csvUrl.authors);
			return authors as Authors[];
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	async listAllAuthors() {
		try {
			console.log('\nThese are the authors available\n');
			const authors = await this.readAuthors();
			console.log(authors);
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async listAllBooks() {
		try {
			console.log('\nThese are the books available\n');
			const books = await this.readBook();
			console.log(books);
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async listAllBooksSortedByTitle() {
		try {
			console.log('\nThese are the books available sorted by title\n');
			const books = await this.readBook();
			books.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});
			console.log(books);
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async listAllMagazines() {
		try {
			console.log('\nThese are all the magazines available\n');
			const magazines = await this.readMagazines();
			console.log(magazines);
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async listAllMagazinesSortedByTitle() {
		try {
			console.log(
				'\nThese are all the magazines available sorted by title\n'
			);
			const magazines = await this.readMagazines();
			magazines.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});
			console.log(magazines);
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async printAllBooksAndMagazinesSortedByTitle() {
		try {
			const books = await this.readBook();
			books.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});

			const magazines = await this.readMagazines();
			magazines.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});

			console.log(
				'\nThese are all the books available sorted by title\n'
			);
			console.log(books);
			console.log(
				'\nThese are all the magazines available sorted by title\n'
			);
			console.log(magazines);
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async findBookByISBN(isbn: string) {
		try {
			const books = await this.readBook();
			const singleBook = books.find((value) => {
				return value.isbn === isbn;
			});

			if (singleBook) {
				console.log('\nHere is the book you are looking for!\n');
				console.log(singleBook);
			} else {
				console.log('\nNo book found for given isbn\n');
			}
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async findMagazineByISBN(isbn: string) {
		try {
			const books = await this.readMagazines();
			const singleMagazine = books.find((value) => {
				return value.isbn === isbn;
			});

			if (singleMagazine) {
				console.log('\nHere is the book you are looking for!\n');
				console.log(singleMagazine);
			} else {
				console.log('\nNo magazine found for given isbn\n');
			}
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async findAllBooksByAuthorEmail(email: string) {
		try {
			const books = await this.readBook();
			const foundBooks = books.filter((value) => {
				return value.authors.includes(email);
			});

			if (foundBooks.length > 0) {
				console.log(
					'\nHere is all the books for the given author email!\n'
				);
				console.log(foundBooks);
			} else {
				console.log('\nNo books found for given author\n');
				console.log(foundBooks);
			}
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async findAllMagazinesByAuthorEmail(email: string) {
		try {
			const magazines = await this.readMagazines();
			const foundMagazines = magazines.filter((value) => {
				return value.authors.includes(email);
			});

			if (foundMagazines.length > 0) {
				console.log(
					'\nHere is all the magazines for the given author email!\n'
				);
				console.log(foundMagazines);
			} else {
				console.log('\nNo magazines found for given author\n');
				console.log(foundMagazines);
			}
		} catch (err) {
			console.error('Error in fetching data');
		}
	}

	async exportSingleBookAndMagazineToCsv(outFolderPath: string) {
		try {
			const magazines = await this.readMagazines();
			const books = await this.readBook();
			const singleBook = books[0];
			const singleMagazine = magazines[0];

			CsvHelper.convertToCsvAndSave(outFolderPath, 'book.csv', [
				singleBook,
			]);
			CsvHelper.convertToCsvAndSave(outFolderPath, 'magazine.csv', [
				singleMagazine,
			]);

			console.log(`\nFile export at ${outFolderPath} location\n`);
		} catch (err) {
			console.error(err);
		}
	}
}

export default new CsvController();
