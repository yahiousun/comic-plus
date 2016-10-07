export default function(textContent) {
    let injection = document.createElement('script');
    injection.textContent = textContent;
    document.head.appendChild(injection);
    injection.parentNode.removeChild(injection);
}