data = {
    name: '',
    fname: '',
    numClicks: 0
}
var names = ['mewie', 'randolph', 'josephine', 'sammy'];
 var cats = [];
 var baseFname = 'kitty';
 var current = null;
 var cat = function (i) {
     this.id = i;
     this.fname = baseFname + i + '.jpg';
     this.nclicks = 0;
     this.name = names[i]
 }
 $.each(names, function (i, e) {
     var c = new cat(i);
     $('#list').append('<li><a class="catlink" href="#" data-id="' + i + '">' + c.name + '</a></li>');
     cats.push(c);
 });
 $('.catlink').click(function () {
     current = $(this).data('id');
     var cat = cats[current];
     $('#cat').find('img').attr('src', cat.fname);
     $('#name').text(cat.name);
     $('#nclicks').text(cat.nclicks);
 })
 $('#cat').find('img').click(() => {
     cats[current].nclicks++;
     $('#nclicks').text(cats[current].nclicks);
 });