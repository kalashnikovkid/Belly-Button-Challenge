//Getting the JSON data
const jsondata = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json");

//Reading the JSON data
jsondata.then(data => {
    console.log(data);
});

// Creating a function to initialize the dashboard 
function init() {
    // Use d3.select and the #selDataset tag to grab the reference for the drop-down
    let dropdownSelector = d3.select("#selDataset");

    // Looping over the names array of the JSON sample to populate all
    //of the select options
    jsondata.then((data) => {
      data.names.forEach((sample) => {
        dropdownSelector.append("option").text(sample).property("value", sample);
      });

    // Using the first sample name from the JSON list to build the initial plots
      let myfirst = data.names[0];
      buildCharts(myfirst);
      buildMetadata(myfirst);
    });
}

//Creating a function to change the the dropdown selection
function optionChanged(newSample) {
    //Fetching the new data for each new sample
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
//Creating a function to build the bubble and bar charts
function buildCharts(sample) {
    jsondata.then((data) => {
        let samples= data.samples;
        //Creating an array that contains only the objects from the samples array when the ID matches
        //the sample value. Then showing first element
        let firstarray= samples.filter(sampleObj => sampleObj.id == sample);
        let firstpull= firstarray[0]

        // Testing to confirm what is being pulled by these variables
        console.log("Samples:", samples);
        console.log("First Array:", firstarray)
        console.log("Result:", firstpull)

        // Setting up chart creation by assigning variables
        let sampleValues = firstpull.sample_values.slice(0, 10).reverse();
        let otuIds= firstpull.map(otuID => `OTU ${otuId}`);
        let otuLabels= firstpull.otu_labels;

        //Creating the bar chart's trace
        let barTrace = {
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };

        //Creating the bubble chart's trace
        let bubbleTrace= {
            x: firstpull.otu_ids,
            y: firstpull.sample_values,
            text: firstpull.otu_labels,
            mode: "markers",
            marker: {
                size: firstpull.sample_values,
                color: firstpull.otu_ids,
                colorscale: "Earth"
            }
        };
        
        //Doing layout for the bubble chart
        let bubblelayout= {
            title: "Bacteria Samples",
            showlegend: false,
            xaxis: { title: "OTU ID"},
            yaxis: { title: "Sample Values"},
        };

        //layout for the bar chart
        let barchartlayout= {
            title: "Top 10 OTU",
            showlegend: false,
            xaxis: { title: "Sample Values"},
        };

        //Building an array for Plotly
        let plotData= [barTrace, bubbleTrace];

        //Plotting the bar chart
        console.log("Bar Chart Data:", plotData);
        Plotly.newPlot("bar", [barTrace], barchartlayout);

        //Plotting the bubble chart
        console.log("Bubble Chart Data:", plotData);
        Plotly.newPlot("bubble", [bubbleTrace], bubblelayout);
       });
    }

    // Building the metadata panel
    function buildMetadata(sample) {
        jsondata.then((data) => {
         let metadata = data.metadata;
         console.log(metadata);
         let firstarray = metadata.filter(sampleObj => sampleObj.id == sample);
         let firstpull= firstarray[0];
         let panel = d3.select("#sample-metadata");

         panel.html("");

         //Iterating over the metadata and displaying them in the panel
         Object.entries(result).forEach(([key, value]) => {
            panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
         });
       });
    }

//Initializing the dashboard!
init();
