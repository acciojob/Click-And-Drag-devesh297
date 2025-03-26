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

	.items {
  position: relative;
  
}
    document.addEventListener("mousemove", (e) => {
        if (!selectedItem) return;
        
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        
        // Get container boundaries
        const containerRect = itemsContainer.getBoundingClientRect();
        const itemRect = selectedItem.getBoundingClientRect();
        
        // Constrain within container
        if (x < containerRect.left) x = containerRect.left;
        if (y < containerRect.top) y = containerRect.top;
        if (x + itemRect.width > containerRect.right) x = containerRect.right - itemRect.width;
        if (y + itemRect.height > containerRect.bottom) y = containerRect.bottom - itemRect.height;
        
        selectedItem.style.left = `${x}px`;
        selectedItem.style.top = `${y}px`;
    });
    
    document.addEventListener("mouseup", () => {
        if (selectedItem) {
            selectedItem.style.zIndex = 1;
            selectedItem = null;
        }
    });
});
