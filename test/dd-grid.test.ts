// SPDX-FileCopyrightText: 2022 Digital Dasein <https://digitaldasein.org/>
// SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>
// SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
//
// SPDX-License-Identifier: MIT

import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { DdGrid } from '../src/DdGrid.js';
import '../src/dd-grid.js';

/*---------------------------------------------------------------------*/
/* Config                                                              */
/*---------------------------------------------------------------------*/

const slotFillerSubstring = 'replace me';
const warnFillerNoDim = 'no grid dimensions';

/*---------------------------------------------------------------------*/
/* Test                                                                */
/*---------------------------------------------------------------------*/

describe('DdGrid', () => {
  it('has a default slotcounter of zero', async () => {
    const el = await fixture<DdGrid>(html`<dd-grid></dd-grid>`);
    expect(el.slotCounter).to.equal(0);
  });

  it('increases slotcounter based on dim attribute', async () => {
    const el = await fixture<DdGrid>(html`<dd-grid dim="50 50"></dd-grid>`);
    expect(el.slotCounter).to.equal(2);
  });

  it('has a default title slot fill when not provided', async () => {
    const el = await fixture<DdGrid>(html`<dd-grid dim="50 50;"></dd-grid>`);
    const slot = await el.shadowRoot!.querySelector('slot');
    expect(slot!.innerHTML.toUpperCase()).to.include(
      slotFillerSubstring.toUpperCase()
    );
  });

  it('has a default title slot fill when not provided', async () => {
    const el = await fixture<DdGrid>(html`<dd-grid dim="50 50;"></dd-grid>`);
    const slot = await el.shadowRoot!.querySelector('slot');
    expect(slot!.innerHTML.toUpperCase()).to.include(
      slotFillerSubstring.toUpperCase()
    );
  });

  it('issues a warning when no dim attribute is provided', async () => {
    const el = await fixture<DdGrid>(html`<dd-grid></dd-grid>`);
    expect(el.shadowRoot!.innerHTML.toUpperCase()).to.include(
      warnFillerNoDim.toUpperCase()
    );
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<DdGrid>(html`<dd-grid></dd-grid>`);
    await expect(el).shadowDom.to.be.accessible();
  });

  it('no grid for single dim', async () => {
    const el = await fixture<DdGrid>(html` <dd-grid dim="100"></dd-grid> `);
    const gridRows = el.shadowRoot!.querySelectorAll('.gridrow');
    expect(gridRows.length).to.equal(0);
  });

  it('no auto-fillers', async () => {
    const el = await fixture<DdGrid>(html`
      <dd-grid no-fillers dim="50 50;"></dd-grid>
    `);
    const shadow = el.shadowRoot!.innerHTML;
    expect(shadow).to.not.include('replace me');
  });
});
