let element2Clicked = false;
let element3Clicked = false;

function changeColor(elementId) {
    if (elementId === 'element2') {
        const element = document.getElementById(elementId);
        if (element2Clicked) {
            element.style.backgroundColor = 'green';
            element.style.color = 'black';
        } else {
            element.style.backgroundColor = 'blue';
            element.style.color = 'pink';
        }
        element2Clicked = !element2Clicked;
    } else if (elementId === 'element3') {
        const element = document.querySelector('#element3');
        if (element3Clicked) {
            element.style.backgroundColor = 'blue';
            element.style.color = 'pink';
        } else {
            element.style.backgroundColor = 'green';
            element.style.color = 'black';
        }
        element3Clicked = !element3Clicked;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let imageContainer = document.body; // Змінна для контейнера зображень

    // Додаємо обробник кліку до кожного елемента сторінки
    document.body.querySelectorAll('*').forEach(function (element) {
        element.addEventListener('click', function () {
            changeColors(element);
        });
    });

    let images = [];

    function addImage(fileOrUrl) {
        const newImage = document.createElement('img');

        if (fileOrUrl instanceof File) {
            newImage.src = URL.createObjectURL(fileOrUrl);
        } else if (typeof fileOrUrl === 'string') {
            newImage.src = fileOrUrl;
        }

        newImage.alt = 'Фото міста';
        newImage.style.maxWidth = '100%';
        newImage.style.height = 'auto';
        newImage.style.border = '2px solid #ddd';
        newImage.style.borderRadius = '8px';
        newImage.style.marginTop = '20px';

        newImage.addEventListener('click', function () {
            changeColors(newImage);
        });

        images.push(newImage);
        imageContainer.appendChild(newImage);
    }

    function updateLastImageSize(sizeChange) {
        const lastImage = images.length > 0 ? images[images.length - 1] : document.querySelector('img');

        if (lastImage) {
            const currentSize = parseInt(window.getComputedStyle(lastImage).getPropertyValue('width'));
            lastImage.style.width = (currentSize + sizeChange) + 'px';
        }
    }

    function deleteLastImage() {
        const lastImage = images.length > 0 ? images.pop() : document.querySelector('img');

        if (lastImage) {
            imageContainer.removeChild(lastImage);
        }
    }

    // Додаємо обробник кліку до кнопок
    document.querySelector('#addButton').addEventListener('click', function () {
        const fileInput = document.querySelector('#fileInput');
        const imageUrlInput = document.querySelector('#imageUrlInput');

        if (fileInput.files.length > 0) {
            addImage(fileInput.files[0]);
        } else if (imageUrlInput.value.trim() !== '') {
            addImage(imageUrlInput.value);
        }
    });

    document.querySelector('#increaseButton').addEventListener('click', function () { updateLastImageSize(10); });
    document.querySelector('#decreaseButton').addEventListener('click', function () { updateLastImageSize(-10); });
    document.querySelector('#deleteButton').addEventListener('click', deleteLastImage);
});