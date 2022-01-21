const styles = `
    .the-container {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 200px;
        background-color: #FFF;
    }
`;
const html = document.createElement('div');
html.innerHTML = `
    <style>${styles}</style>
    <div class="the-container">
        <input>
    </div>
`;

document.body.appendChild(html);