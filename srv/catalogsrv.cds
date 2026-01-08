using { db.books as mybook } from '../db/booksdatamodel';

service LibrarySrv @(requires:'authenticated-user'){

    
        entity BooksSet @(
                restrict : [
                {grant:['READ','WRITE'] , to : 'Admin'},
                {grant:['READ'],to : 'Kids',where: 'booksAgeGroup=$user.booksAgeGroup'}
                ]
        )         
        
         as projection on mybook.Books;

        }