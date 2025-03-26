document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.querySelector(".items");
    const items = document.querySelectorAll(".item");
    let selectedItem = null;
    let offsetX = 0, offsetY = 0;
    
    items.forEach(item => {
        item.addEventListener("mousedown", (e) => {
            selectedItem = e.target;
            offsetX = e.clientX - selectedItem.getBoundingClientRect().left;
            offsetY = e.clientY - selectedItem.getBoundingClientRect().top;
            selectedItem.style.position = "absolute";
            selectedItem.style.zIndex = 1000;
        });
    });

    document.addEventListener("mousemove", (e) => {
    if (!selectedItem) return;
    
    let x = e.clientX - offsetX - itemsContainer.getBoundingClientRect().left;
    let y = e.clientY - offsetY - itemsContainer.getBoundingClientRect().top;
    
    // Get container boundaries
    const containerRect = itemsContainer.getBoundingClientRect();
    const itemRect = selectedItem.getBoundingClientRect();
    
    // Constrain within container
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x + itemRect.width > containerRect.width) x = containerRect.width - itemRect.width;
    if (y + itemRect.height > containerRect.height) y = containerRect.height - itemRect.height;
    
    selectedItem.style.transform = `translate(${x}px, ${y}px)`;
});

    document.addEventListener("mouseup", () => {
        if (selectedItem) {
            selectedItem.style.zIndex = 1;
            selectedItem = null;
        }
    });
});
