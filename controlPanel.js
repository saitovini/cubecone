const controlPanel = `
<div id="panel-container">
  <button id="toggle-button">Hide Panel</button>
  <div id="control-panel-content">
    <table>
      <!-- Conteúdo do painel de controle -->
      <tr>
        <td>Height</td>
        <td colspan="3">
          <input class='height' type="range" min="0.5" max="2.0" step="0.1" value="1.0" />
        </td>
      </tr>
      <tr>
        <td>Radius</td>
        <td colspan="3">
          <input class='radius' type="range" min="0.5" max="2.0" step="0.1" value="1.0" />
        </td>
      </tr>
      <tr>
        <td>Resolution</td>
        <td colspan="3">
          <input class='resolution' type="range" min="4" max="100" step="1" value="6" />
        </td>
      </tr>
      <tr>
        <td>Capping</td>
        <td colspan="3">
          <input class='capping' type="checkbox" checked />
        </td>
      </tr>
      <tr style="text-align: center;">
        <td></td>
        <td>X</td>
        <td>Y</td>
        <td>Z</td>
      </tr>
      <tr>
        <td>Origin</td>
        <td>
          <input style="width: 50px" class='center' data-index="0" type="range" min="-1" max="1" step="0.1" value="0" />
        </td>
        <td>
          <input style="width: 50px" class='center' data-index="1" type="range" min="-1" max="1" step="0.1" value="0" />
        </td>
        <td>
          <input style="width: 50px" class='center' data-index="2" type="range" min="-1" max="1" step="0.1" value="0" />
        </td>
      </tr>
      <tr>
        <td>Direction</td>
        <td>
          <input style="width: 50px" class='direction' data-index="0" type="range" min="-1" max="1" step="0.1" value="1" />
        </td>
        <td>
          <input style="width: 50px" class='direction' data-index="1" type="range" min="-1" max="1" step="0.1" value="0" />
        </td>
        <td>
          <input style="width: 50px" class='direction' data-index="2" type="range" min="-1" max="1" step="0.1" value="0" />
        </td>
      </tr>
    </table>
  </div>
</div>
`;

export default controlPanel;
