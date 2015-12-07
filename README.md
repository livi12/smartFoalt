# smartFoalt
在做这个插件的过程中遇到了很多问题。在此总结一下

1、一般要将相对定位的元素在滑动的过程中改成相对于窗口的固定定位时，应该采用如下的策略，如果可以给该元素添加父元素，则将该元素放在一个块状元素中，给父元素一定的高度，当要设置fixed的元素设置成fixed 属性后，改元素之前所在的布局结构不会改变，这样操作会比较方便。
如果直接将改元素从relative 或者absolute 改成fixed属性，而该元素所在不布局空间将会被移除，从而造成一定的问题。该例子就是没有父元素占高度的情况。

2、table中的tr在ie浏览器下没有border样式，设置border样式无效

3、table中的tr td th设置position:relative也许会影响border的设置效果，本例子中开始将td设置了position:relative属性，导致边框设置的一直无效，真是找了好久才发现问题。

具体的js实现查看smartFloat.js文件


还有一个添加分类，修改，删除分类的小插件 http://livi12.github.io/smartFoalt/pages/leke-v1-2/index.html
