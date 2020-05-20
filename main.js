var lastScrollTop = 0;
var lastRandomY = 0;
const yRange = {
    min: -20,
    max: 30,
};
const $dog = $('#dog-run');
const dogWidth = $dog.outerWidth();

$(function () {
    const getRandomY = (currentTop) => {
        if (currentTop % 2) return lastRandomY; // debounce

        lastRandomY += Math.floor(Math.random() * 15) - 10;
        lastRandomY = Math.max(
            yRange.min,
            Math.min(yRange.max, lastRandomY)
        );
        return lastRandomY;
    }

    const dogRun = () => {
        const viewHeight = $(window).height();
        const maxHeight = $('body').height();
        const currentTop = $(window).scrollTop() || $('body').scrollTop();
        const dogPosX = (currentTop / (maxHeight - viewHeight)) * 100; // 現在捲動佔全頁面多入百份比
        const dogWidthOffset = currentTop / dogWidth;

        const originTransform = $dog.css('transform');
        let newTransform = `translate3d(${dogPosX + dogWidthOffset}vw, ${getRandomY(currentTop)}px , 0)`;

        if (originTransform !== 'none'
        && lastScrollTop > currentTop) {
            newTransform += ' scaleX(-1)'; // flip-x
        }

        $dog.css({
            transform: newTransform
        });
        lastScrollTop = currentTop;
    }
    $(window).on('scroll resize', function () {
        dogRun();
    });

});