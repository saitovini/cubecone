import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkCubeSource from '@kitware/vtk.js/Filters/Sources/CubeSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';

import controlPanel from './controlPanel.js';

// ----------------------------------------------------------------------------
// Configuração padrão do renderizador
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [0, 0, 0],
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// ----------------------------------------------------------------------------
// Função para criar pipelines genéricos
// ----------------------------------------------------------------------------

function createPipeline(source) {
  const actor = vtkActor.newInstance();
  const mapper = vtkMapper.newInstance();

  actor.setMapper(mapper);
  mapper.setInputConnection(source.getOutputPort());

  renderer.addActor(actor);
  return { source, mapper, actor };
}

// ----------------------------------------------------------------------------
// Funções para criar pipelines específicos
// ----------------------------------------------------------------------------

function createConePipeline() {
  return createPipeline(vtkConeSource.newInstance());
}

function createCubePipeline() {
  return createPipeline(vtkCubeSource.newInstance());
}

// ----------------------------------------------------------------------------
// Criando pipelines para Cone e Cubo
// ----------------------------------------------------------------------------

const pipelinesCone = [createConePipeline(), createConePipeline()];
const pipelinesCubo = [createCubePipeline(), createCubePipeline()];

// Configuração para representar cone e cubo com wireframe e cor vermelha
pipelinesCone[0].actor.getProperty().setRepresentation(1);
pipelinesCone[0].actor.getProperty().setColor(1, 0, 0);
pipelinesCone[0].source.setCenter(2, 0, 0);
pipelinesCone[1].source.setCenter(2, 0, 0);


pipelinesCubo[0].actor.getProperty().setRepresentation(1);
pipelinesCubo[0].actor.getProperty().setColor(1, 0, 0);
pipelinesCubo[0].source.setCenter(-2, 0, 0);
pipelinesCubo[1].source.setCenter(-2, 0, 0);


renderer.resetCamera();
renderer.resetCameraClippingRange();
renderWindow.render();

// ----------------------------------------------------------------------------
// Controle de UI
// ----------------------------------------------------------------------------

fullScreenRenderer.addController(controlPanel);

// Função para alternar a exibição do painel de controle
const toggleButton = document.getElementById('toggle-button');
const controlPanelContent = document.getElementById('control-panel-content');

toggleButton.addEventListener('click', () => {
  if (controlPanelContent.style.display === 'none') {
    controlPanelContent.style.display = 'block';
    toggleButton.textContent = 'Hide Panel';
  } else {
    controlPanelContent.style.display = 'none';
    toggleButton.textContent = 'Show Panel';
  }
});

// Função genérica para atualizar cone e cubo
function updateProperty(propertyName, value) {
  pipelinesCone.forEach((pipeline) => pipeline.source.set({ [propertyName]: value }));
  renderer.resetCameraClippingRange();
  renderWindow.render();
}

['height', 'radius', 'resolution'].forEach((propertyName) => {
  document.querySelector(`.${propertyName}`).addEventListener('input', (e) => {
    updateProperty(propertyName, Number(e.target.value));
  });
});

document.querySelector('.capping').addEventListener('change', (e) => {
  const capping = !!e.target.checked;
  pipelinesCone.forEach((pipeline) => pipeline.source.set({ capping }));
  renderWindow.render();
});

// ----------------------------------------------------------------------------
// Funções de atualização para os cones e cubos transformados
// ----------------------------------------------------------------------------

const centerElems = document.querySelectorAll('.center');
const directionElems = document.querySelectorAll('.direction');
const rotationsElems = document.querySelectorAll('.rotations');

function updateTransformedCone() {
  const center = [0, 0, 0];
  const direction = [1, 0, 0];
  for (let i = 0; i < 3; i++) {
    center[i] = Number(centerElems[i].value);
    direction[i] = Number(directionElems[i].value);
  }
  pipelinesCone[1].source.set({ center, direction });
  renderWindow.render();
}

function updateTransformedCube() {
  const center = [0, 0, 0];
  const rotations = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    center[i] = Number(centerElems[i].value);
    rotations[i] = Number(rotationsElems[i].value);
  }
  pipelinesCubo[1].source.set({ center, rotations });
  renderer.resetCameraClippingRange();
  renderWindow.render();
}

for (let i = 0; i < 3; i++) {
  centerElems[i].addEventListener('input', updateTransformedCone);
  directionElems[i].addEventListener('input', updateTransformedCone);
  rotationsElems[i].addEventListener('input', updateTransformedCube);
}

// ----------------------------------------------------------------------------
// Variáveis globais para inspeção no console do navegador
// ----------------------------------------------------------------------------

global.pipelinesCone = pipelinesCone;
global.pipelinesCubo = pipelinesCubo;
global.renderer = renderer;
global.renderWindow = renderWindow;
