// SPDX-FileCopyrightText: 2022 Digital Dasein <https://digital-dasein.gitlab.io/>
// SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>
// SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
//
// SPDX-License-Identifier: MIT

import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const DEFAULT_ATTRIBUTES = {
  dim: '',
  slotStyle: '',
  rowStyle: '',
  noFillers: false,
};

export class DdGrid extends LitElement {
  static styles = css`
    :host {
      --gridspace-row: var(--dd-gridspace-row, 10px);
      --gridspace-col: var(--dd-gridspace-col, 10px);
    }
    .gridrow {
      padding-bottom: var(--gridspace-row);
    }
  `;

  @property({ type: String, attribute: 'dim' })
  dim = DEFAULT_ATTRIBUTES.dim;

  @property({ type: String, attribute: 'slot-style' })
  slotStyle = DEFAULT_ATTRIBUTES.slotStyle;

  @property({ type: String, attribute: 'cell-style' })
  cellStyle = DEFAULT_ATTRIBUTES.slotStyle;

  @property({ type: String, attribute: 'row-style' })
  rowStyle = DEFAULT_ATTRIBUTES.rowStyle;

  @property({ type: Boolean, attribute: 'no-fillers', reflect: true })
  noFillers = DEFAULT_ATTRIBUTES.noFillers;

  @property({ type: Number })
  slotCounter = 0;

  /* Make grid from dimensions */
  makeGridDim() {
    let gridClasses = '';
    let gridContents = '';

    // find each grid row
    const dimArray = this.dim!.split(/[;]/);
    // if last row ended with ';', an empty item in the row needs to be popped
    if (dimArray.at(-1) === '') dimArray.pop();

    // check if it is not just an empty grid or a grid of 1 cell
    let noGrid = false;
    if (dimArray.length > 0) {
      if (dimArray.length === 1 && dimArray[0].split(' ').length === 1)
        noGrid = true;
    }
    if (!noGrid) {
      // find the amount of grid rows
      const gridRows = dimArray.length;

      // parse each row
      for (let i = 0; i < gridRows; i++) {
        const row = dimArray[i];

        // split by white space, throw out empty spaces " "
        const rowSplit = row.split(' ');
        const rowCells = rowSplit.filter(e => e);
        let rowCellContent = '';

        // add % to each number, to be used by grid template
        for (let el = 0; el < rowCells.length; el++) {
          rowCells[el] = `${rowCells[el]}%`;
          if (this.noFillers)
            rowCellContent += `
             <div style="${this.slotStyle} ${this.cellStyle}">
                <slot name="${this.slotCounter + 1}"> </slot>
            </div>`;
          else
            rowCellContent += `
             <div style="${this.slotStyle} ${this.cellStyle}">
                <slot name="${this.slotCounter + 1}">
                  <i>replace me with: <br>
                  <code>
                  &lt;div slot=${
                    this.slotCounter + 1
                  }&gt;your content&lt;/div&gt;
                  </code>
                  </i>
                </slot>
            </div>`;

          this.slotCounter++;
        }

        // join together again (grid template)
        const rowColumns = rowCells.join(' ');
        const gridClass = `
          .grid-${i + 1}{
            display: grid;
            grid-template-columns: ${rowColumns};
            grid-gap: var(--gridspace-col);
          }
          `;
        // add the new grid class to the styles element
        gridClasses += gridClass;

        // adding the content fillers
        gridContents += `
        <div class="gridrow grid-${i + 1}" style="${this.rowStyle}">
          ${rowCellContent}
        </div>
        `;
      }
    }

    const resultStyle = `
      <style>
        ${gridClasses}
      </style>
    `;

    const resultHtml = `
        ${gridContents}
    `;

    return `
      ${resultStyle}
      ${resultHtml}
    `;
  }

  render() {
    if (this.getAttribute('dim')) {
      return html` ${unsafeHTML(this.makeGridDim())} `;
    }

    return html`
      <i>
        <p>
          [WARN] no grid dimensions specified. Make sure to include a
          <b>non-empty</b> <code>dim</code> attribute.
        </p>
      </i>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dd-grid': DdGrid;
  }
}
