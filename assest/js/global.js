// Returns all element descendants of node that match selectors ([data-import]).
// this returns an array like element that can be looped through
const componentElements = document.querySelectorAll("[data-import]");

// loop through this array list elements

const renderComponent = (elements)=>{

    for (let element of elements) {
    // get the specific attributes that we stored the path to the component/module in
    const dataImport = element.getAttribute("data-import");
    
    fetch(dataImport)
        .then((res) => {
            if(!res.ok){
                throw "Not found"
            }
        return res.text();
        })
        .then((component) => {
        element.innerHTML = component;
        loadComponentScripts(element)
        const compElements = element.querySelectorAll("[data-import]");
        renderComponent(compElements)
        })
        .catch(() => {
        element.innerHTML = `<h4>Component not found</h4>`;
        });
    }

}


renderComponent (componentElements);

function loadComponentScripts(element){
    const scripts = element.querySelectorAll("script");
    for (let script of scripts) {
        const newScript = document.createElement('script');
        if(script.src){
            newScript.src = script.src;
        }
        if(script.textContent){
            newScript.textContent = script.textContent;
        }
        script.remove()
        
        document.body.appendChild(newScript)
    }
}