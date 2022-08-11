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

/**
 * Main class for HTML web component **`dd-grid`**
 *
 * For **styling** this component, check out {@link DdGrid.styles |
 * the styles section}.
 *
 * <u>**Important note**</u>: all lit-component properties (interpreted here as
 * `other properties`) that are documented here have a **corresponding
 * HTML attribute**. The _non-attribute_ properties are consired private,
 * and are ingored in the documentation.
 *
 * @example
 * A simple 2x2 grid, with some specifc cell styling (border)
 *
 * ```html
 * <html>
 *   [...]
 *   <dd-grid slotStyle="border: 1px solid black;"
 *            dim="70 30; 50 50;">
 *      <div slot="1">
 *        I should be 70 percent wide whereas my neighbour should only be 30.
 *      </div>
 *      <div slot="2" style="background-color:blue;">
 *        Am I only 30? There is nothing wrong with being 30 :'-(.
 *      </div>
 *      <div slot="3">
 *        We should be 50-50, not unlike Belgian taxes
 *      </div>
 *      <div slot="4">
 *        Slot 4 also here.
 *      </div>
 *   </dd-grid>
 *   [...]
 * </html>
 * ```
 *
 * Whenever you do _not_ include the appropriate number of slots based on your
 * defined dimensions, a warning will be issued (in the form of a sample
 * <b>filler</b>, with an example HTML implementation).
 *
 */

export class DdGrid extends LitElement {
  /**
   * To style the `dd-grid` component, use the following **CSS host
   * variables** (including their default values):
   *
   * |  <div style="width:200px">CSS variable</div>   | <div style="width:200px">Default</div>   | Description |
   * |:-----------------------------------------------|:-----------------------------------------|:------------|
   * |**`--dd-gridspace-row`**        |`10px`    | space between grid rows             |
   * |**`--dd-gridspace-col`**        |`10px`    | space between grid columns          |
   *
   * The variables can be set anywhere in your HTML context (e.g. in `:root`,
   * up until the `dd-slide-collection` component itself).
   *
   */

  static styles = css`
    :host {
      --gridspace-row: var(--dd-gridspace-row, 10px);
      --gridspace-col: var(--dd-gridspace-col, 10px);
    }
    .gridrow {
      padding-bottom: var(--gridspace-row);
    }
  `;

  /**
   * String with grid dimensions
   * - rows are separated with a `;` (semiolon)
   * - values correspond to CSS widths
   *
   * (see also example above)
   *
   * **Corresponding attribute:** `dim`
   *
   * **Default value:** `""` (empty string)
   */
  @property({ type: String, attribute: 'dim' })
  dim = DEFAULT_ATTRIBUTES.dim;

  /**
   * CSS Style for each slot in the grid
   *
   * **Corresponding attribute:** `slot-style`
   *
   * **Default value:** `""` (empty string)
   */
  @property({ type: String, attribute: 'slot-style' })
  slotStyle = DEFAULT_ATTRIBUTES.slotStyle;

  /**
   * Alias for {@link DdGrid.slotStyle }
   *
   * **Corresponding attribute:** `cell-style`
   *
   * **Default value:** `""` (empty string)
   */
  @property({ type: String, attribute: 'cell-style' })
  cellStyle = DEFAULT_ATTRIBUTES.slotStyle;

  /**
   * CSS Style for each row
   *
   * **Corresponding attribute:** `row-style`
   *
   * **Default value:** `""` (empty string)
   */
  @property({ type: String, attribute: 'row-style' })
  rowStyle = DEFAULT_ATTRIBUTES.rowStyle;

  /**
   * Boolean: whether or not to include fillers
   * If `true`, no auto-fillers will be rendered when slots are not filled
   * in correspondence to grid dimensions.
   *
   * **Corresponding attribute:** `no-fillers`
   *
   * **Default value:** `false`
   * */
  @property({ type: Boolean, attribute: 'no-fillers', reflect: true })
  noFillers = DEFAULT_ATTRIBUTES.noFillers;

  /** @ignore */
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
