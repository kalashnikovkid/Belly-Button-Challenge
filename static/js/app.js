// Define the function and initialize it
function init() {
    // Use D3 to read the samples.json file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      // Get the dropdown menus select element 
      var dropdown = d3.select("#selDataset");
  
      // Populate the dropdown menu with all of the sample IDs
      data.names.forEach((name) => {
        dropdown.append("option").text(name).property("value", name);
      });
  
      // Use the first sample ID to initialize the dashboard
      var firstSample = data.names[0];
      buildCharts(firstSample);
      showMetadata(firstSample);
    });
  }
  
  // Defining a function to build the charts and display metadata 
  function buildCharts(sample) {
    // Use D3 to read the samples.json file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      // Filter the selected samples' data 
      var samples = data.samples.filter((s) => s.id === sample)[0];
  
      // Getting the top 10 OTUs for the selected sample
      var otuIds = samples.otu_ids.slice(0, 10).reverse();
      var sampleValues = samples.sample_values.slice(0, 10).reverse();
      var otuLabels = samples.otu_labels.slice(0, 10).reverse();
  
      // Building the bar chart
      var barTrace = {
        x: sampleValues,
        y: otuIds.map((id) => `OTU ${id}`),
        text: otuLabels,
        type: "bar",
        orientation: "h"
      };
  
      var barData = [barTrace];
  
      var barLayout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
      };
  
      Plotly.newPlot("bar", barData, barLayout);
  
      // Building the bubble chart
      var bubbleTrace = {
        x: samples.otu_ids,
        y: samples.sample_values,
        text: samples.otu_labels,
        mode: "markers",
        marker: {
          size: samples.sample_values,
          color: samples.otu_ids
        }
      };
  
      var bubbleData = [bubbleTrace];
  
      var bubbleLayout = {
        title: "OTU IDs vs Sample Values",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
      };
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
  }
  
  // Defining a function to show a samples' metadata
  function showMetadata(sample) {
    // Reading in the samples.json file with D3
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      // Filtering the metadata
      var metadata = data.metadata.filter((m) => m.id == sample)[0];
  
      // Selecting the metadata panel
      var metadataPanel = d3.select("#sample-metadata");

      // Clearing out existing metadata
      metadataPanel.html("");

      // Iterate through the metadata object and display key-value pairs
      Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
      });
    });
  }

  // Defining a function to manage changes in the dropdown menu
  function optionChanged(sample) {
    buildCharts(sample);
    showMetadata(sample);
  }

  // Initializing dashboard!
  init();
  