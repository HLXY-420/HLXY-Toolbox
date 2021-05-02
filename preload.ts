window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (element) { // @ts-ignore
      element.innerText = text;
    }
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
