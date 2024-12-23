document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('saveItem');
    const categorySelect = document.getElementById('category');
    const shoppingList = document.getElementById('shoppingList');

    saveButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];
            const url = activeTab.url;
            const category = categorySelect.value;

            chrome.storage.sync.get({ items: [] }, function (data) {
                const items = data.items;
                items.push({ url, category });
                chrome.storage.sync.set({ items }, function () {
                    displayItems();
                });
            });
        });
    });

    function displayItems() {
        chrome.storage.sync.get({ items: [] }, function (data) {
            shoppingList.innerHTML = '';
            data.items.forEach(function (item) {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.category}: `;
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.url;
                link.target = '_blank';
                listItem.appendChild(link);
                shoppingList.appendChild(listItem);
            });
        });
    }

    displayItems();
});
