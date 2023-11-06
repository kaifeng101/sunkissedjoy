import React, { useEffect } from 'react';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';

import { DEFAULT_SECTIONS } from 'polotno/side-panel';
import { TemplatesSection } from './CustomTemplatePanel';
import { DraftSection } from './CustomDraftsPanel';
// import { TemplatesSection } from './templates-panel';


// console.log(DEFAULT_SECTIONS)
let NewTEmp = [];
if (!window.location.pathname.includes('admin')) {
  NewTEmp = [DraftSection]
}
const sections = [TemplatesSection,...DEFAULT_SECTIONS.filter(section=>section.name!=='templates'), ...NewTEmp];

export const Editor = ({store}) => {

  return (
    <PolotnoContainer>
      <SidePanelWrap>
        <SidePanel
          store={store}
          sections={sections}
          defaultSection="custom-templates"
        />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar  store={store} />
        <Workspace pageControlsEnabled={false} store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};


