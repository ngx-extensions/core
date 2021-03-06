import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable({
  providedIn: 'root'
})
export class StyleManager {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}
  /**
   * Set the stylesheet with the specified key.
   */
  setStyle(key: string, href: string): void {
    this.getLinkElementForKey(key).setAttribute('href', href);
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  removeStyle(key: string): void {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      this.document.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(key: string): Element {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  private getExistingLinkElementByKey(key: string): Element {
    return this.document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
  }

  private createLinkElementWithKey(key: string): HTMLLinkElement {
    const linkEl = this.document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(getClassNameForKey(key));
    this.document.head.appendChild(linkEl);
    return linkEl;
  }
}

function getClassNameForKey(key: string): string {
  return `style-manager-${key}`;
}
