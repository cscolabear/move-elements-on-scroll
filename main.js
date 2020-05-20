var lastScrollTop = 0;
var lastRandomY = 0;
const yRange = {
    min: -30,
    max: 40,
};
const $dog = $('#dog-run');
const dogWidth = $dog.outerWidth();

$(function () {
    const getRandomY = (currentTop) => {
        if (currentTop % 2) return lastRandomY; // debounce

        lastRandomY += Math.floor(Math.random() * 10) - 4;
        lastRandomY = Math.max(
            yRange.min,
            Math.min(yRange.max, lastRandomY)
        );
        return lastRandomY;
    }
    $(window).scroll(function () {
        const viewHeight = $(window).height();
        const maxHeight = $('body').height();
        const currentTop = $(window).scrollTop() || $('body').scrollTop();
        let dogPosX = (currentTop / (maxHeight - viewHeight)) * 120; // 現在捲動佔全頁面多入百份比
        console.table({
            dogPosX,
            currentTop,
            maxHeight,
            viewHeight
        });

        const originTransform = $dog.css('transform');
        let newTransform = `translate3d(calc(-${dogWidth}px + ${dogPosX}vw), ${getRandomY(currentTop)}px , 0)`;

        if (originTransform !== 'none'
        && lastScrollTop > currentTop) {
            newTransform += ' scaleX(-1)'; // flip-x
        }

        $dog.css({
            transform: newTransform
        });
        lastScrollTop = currentTop;
    });
});