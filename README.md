# sierpinski-triangle
## What is a Sierpiński Triangle
From https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle:

"The Sierpiński triangle (sometimes spelled Sierpinski), also called the Sierpiński gasket or Sierpiński sieve, is a fractal attractive fixed set with the overall shape of an equilateral triangle, subdivided recursively into smaller equilateral triangles. Originally constructed as a curve, this is one of the basic examples of self-similar sets—that is, it is a mathematically generated pattern that is reproducible at any magnification or reduction. It is named after the Polish mathematician Wacław Sierpiński, but appeared as a decorative pattern many centuries before the work of Sierpiński."

## This program
This program recreates the Sierpiński triangle following a series of simple steps, after the user selects a number of dots to be drawn (from 1 to 25,000):

1. It draws three dots that delimit an isosceles triangle; these are the *original dots*
2. It draws a dot at a random position inside the imaginary triangle; we will call this the *current dot*
3. It selects one of the *original dots* randomly
4. It draws another dot exactly halfway between the *current dot* and the randomly selected *original dot*; the newly drawn dot becomes the *current dot* now
5. steps 3 and 4 are repeated until the number of dots (as selected by the user) is reached


