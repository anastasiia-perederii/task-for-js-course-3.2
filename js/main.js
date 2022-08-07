//Spinner
/*
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('body > .d-flex').classList.add('d-none');
    document.querySelector('.page-header').classList.remove('d-none');
  });
*/

// Pagination


class App {
    $parentList = null;
    $parentPaginate = null;

    constructor({ parentList, parentPaginate }){

        if (!parentList) {
            return new Error('no parent!');
        }

        this.$parentList = parentList;
        this.$parentPaginate = parentPaginate;

        this.onInit();
    }

    _page = 1;
    get page(){
        return this._page;
    }
    set page(currentPage){
        this._page = currentPage;

        const $activeItem = this.$parentPaginate.querySelectorAll('a');
        if ($activeItem.length) {
            $activeItem.forEach(($item, index) => {

                $item.classList.toggle('active', index === currentPage);
            })
        }

        this.getPeople(currentPage);
    }

    _isLoading = true;
    get isLoading(){
        return this._isLoading;
    }
    set isLoading(value){
        this._isLoading = value;

        document.querySelector('.spinner-border').classList.toggle('d-none', !value);
    }

    onInit() {
    }

    async getPeople (page) {
        this.isLoading = true;

        this.clearList();
        const result = await fetch('https://swapi.dev/api/people/?page=' + page);
        const data = await result.json();
        this.renderList(data.results);
        this.isLoading = false;
        
        return data;
    }

    clearList(){
        this.$parentList.innerHTML = '';
    }

    renderList(list) {
        list.forEach(person => {
            this.addPersonItem(person);
        });
    }

    addPersonItem(person){
        // <li class="list-group-item"> Name </li>
        const $li = document.createElement('li');
        $li.className = 'list-group-item';
        $li.innerText = `${person['name']} (birth year: ${person['birth_year']})`;
        this.$parentList.appendChild($li);
    }

    renderPaginate(count) {
        const itemLength = Math.ceil(count / 10);

        /* --- Generate Prev button --- */
        let $li = document.createElement('li');
        $li.className = 'page-item';
        let $a = document.createElement('a');
        $a.innerText = 'Previous';
        $a.className = 'page-link';
        $a.href = '#';

        $a.addEventListener('click', (event) => {
            if (this.page !== 1) {
                this.page = this.page - 1;
            }
            event.preventDefault();
        });

        $li.appendChild($a);
        this.$parentPaginate.appendChild($li);
        /* --- END Generate Prev button --- */

        /* --- Generate Page buttons --- */
        for(let i = 1; i <= itemLength; i++) {
            // <li class="page-item"><a class="page-link" href="#">1</a></li>
            $li = document.createElement('li');
            $li.className = 'page-item';
            $a = document.createElement('a');
            $a.className = 'page-link';
            $a.href = '#';

            if (i === 1) {
                $a.className += ' active';
            }

            $a.innerText = i;
            $a.addEventListener('click', (event) => {
                this.page = i;
                event.preventDefault();
            });

            $li.appendChild($a);

            this.$parentPaginate.appendChild($li);
        }
        /* --- END Generate Page buttons --- */

        /* --- Generate Next button --- */
        $li = document.createElement('li');
        $li.className = 'page-item';
        $a = document.createElement('a');
        $a.innerText = 'Next';
        $a.className = 'page-link';
        $a.href = '#';

        $a.addEventListener('click', (event) => {
            if (this.page !== itemLength) {
                this.page = this.page + 1;
            }
            event.preventDefault();
        });

        $li.appendChild($a);
        this.$parentPaginate.appendChild($li);
        /* --- END Generate Next button --- */
    }
};

const app = new App({
    parentList: document.querySelector('#people_list'),
    parentPaginate: document.querySelector('.pagination'),
});

app.getPeople(1).then((res) => {
    app.renderPaginate(res.count);
});


















