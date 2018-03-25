console.log('=== intersect ===');

var redBox = document.getElementById('redbox');
var blueBox = document.getElementById('bluebox');
var greenBox = document.getElementById('greenbox');
console.log('intersect(redBox, blueBox)=', intersect(redBox, blueBox));
console.log('intersect(redBox, greenBox)=', intersect(redBox, greenBox));
console.log('intersect(blueBox, greenBox)=', intersect(blueBox, greenBox));


function intersect(node1, node2) {
    var sz1 = node1.getBoundingClientRect();
    var sz2 = node2.getBoundingClientRect();

    var cross = sz1HasPointIsideSz2(sz1, sz2) || sz1HasPointIsideSz2(sz2, sz1);
    return cross;
}


function pointInsideBox(point, box) {
    return (
        (box.x1 <= point.x) && (point.x <= box.x2) &&
        (box.y1 <= point.y) && (point.y <= box.y2)
    );
}


function sz1HasPointIsideSz2(sz1, sz2)
{
    var box2 = {x1: sz2.x, y1: sz2.y, x2: sz2.x + sz2.width, y2: sz2.y + sz2.height};
    var inside1 = pointInsideBox(
        {x: sz1.x, y: sz1.y},
        box2
    );
    var inside2 = pointInsideBox(
        {x: sz1.x + sz1.width, y: sz1.y},
        box2
    );
    var inside3 = pointInsideBox(
        {x: sz1.x, y: sz1.y + sz1.height},
        box2
    );
    var inside4 = pointInsideBox(
        {x: sz1.x + sz1.width, y: sz1.y + sz1.height},
        box2
    );

    return inside1 || inside2 || inside3 || inside4;
}


