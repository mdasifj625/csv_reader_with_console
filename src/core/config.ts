import { DistinctQuestion } from 'inquirer';

interface CsvUrl {
	authors: string;
	books: string;
	magazines: string;
}

interface ConsolePrompt {
	launchQuestion: DistinctQuestion;
	inputQuestion(name: string, message: string): DistinctQuestion;
	confirmQuestion(name: string, message: string): DistinctQuestion;
}

class Config {
	public csvUrl: CsvUrl;
	public consolePrompt: ConsolePrompt;
	constructor() {
		this.csvUrl = {
			authors:
				'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv',
			books: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv',
			magazines:
				'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv',
		};
		this.consolePrompt = {
			launchQuestion: {
				type: 'list',
				name: 'answer',
				message: 'What you want to do select an option?',
				choices: [
					'list_all_books',
					'list_all_books_sorted_title',
					'list_all_authors',
					'list_all_magazines',
					'list_all_magazines_sorted_title',
					'find_a_book_by_isbn',
					'find_a_magazines_by_isbn',
					'find_all_books_by_author_email',
					'find_all_magazines_by_author_email',
					'print_books_magazines_sorted_title',
					'export_single_book_magazine_to_csv',
					'quit',
				],
				pageSize: 20,
			},
			inputQuestion(name: string, message: string) {
				return {
					type: 'input',
					name,
					message,
				};
			},
			confirmQuestion(name: string, message: string) {
				return {
					type: 'confirm',
					message,
					name,
				};
			},
		};
	}
}
export default new Config();
