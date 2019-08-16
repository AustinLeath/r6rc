var h1 = $('h1[id^="cycletxt-"]').hide(),
  i = 0;
(function cycletxt() {
  h1.eq(i)
    .fadeIn(2250)
    .delay(10000)
    .fadeOut(2250, cycletxt);
  i = ++i % h1.length;
})();
