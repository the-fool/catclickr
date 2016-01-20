$(function () {
    var data = {
        cats: [],
        baseFname: '.jpg',
        cat: function (id, name) {
            this.name = name;
            this.id = id;
            this.numClicks = 0;
            this.fname = id.toString() + data.baseFname;
        },
        addCat: function (dict) {
            dict = dict instanceof Array ? dict : [dict];
            $.each(dict, (i, e) => {
                this.cats.push(new this.cat(e.id, e.name));
            });
        },
        getCat: function (id) {
            return this.cats[id];
        },
        incrementClick: function (id) {
            this.getCat(id).numClicks++;
        }
    }

    var control = {
        names: ['mewie', 'randolph', 'josephine', 'sammy'],
        activeCat: -1,
        init: function () {
            var dict = this.names.map((function () {
                var id = 0;
                var mapper = function (name) {
                    return {
                        name: name,
                        id: id++
                    };
                }
                return mapper;
            })());
            data.addCat(dict);
            listView.init(dict);
            portraitView.init();
        },
        clickPic: function () {
            data.incrementClick(this.activeCat);
            portraitView.setClicks(data.getCat(this.activeCat).numClicks);
        },
        clickLI: function (id) {
            this.activeCat = id;
            portraitView.render(data.getCat(id));
        }
    }

    var listView = {
        init: function (namesDict) {
            $.each(namesDict, (i, e) => {
                var htmlStr = '<li><a href="#" data-id="' +
                    e.id + '">' +
                    e.name + '</a></li>';
                this.list.prepend(htmlStr);
            });
            this.list.find('li>a').each(function () {
                $(this).click(function (e) {
                    control.clickLI($(this).data('id'));
                    e.preventDefault();
                });
            });
        },
        list: $('#list')
    };

    var portraitView = {
        img: $('#image'),
        numClicks: $('#nclicks'),
        name: $('#name'),
        init: function () {
            this.img.click(function() {control.clickPic();});
        },
        render: function (cat) {
            this.img.attr('src', cat.fname);
            this.numClicks.text(cat.numClicks);
            this.name.text(cat.name);
        },
        setClicks: function (n) {
            this.numClicks.text(n);
        }
    };
    control.init();
});