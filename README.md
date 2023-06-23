**The Belly Button Challenge/Module 14 Challenge**

**INSTRUCTIONS**
The goal of this assignment was to build an interactive dashboard to explore the provided
dataset, Belly Button Diversity. This dataset catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic
units, or OTUs, in the study) were present in more than 70% of people, while the rest were
relatively rare. 

I complete the following to build the included interactive dashboard:

1. Read in the samples.json file using D3:
https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classr1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json. 

2. Built horizontal bar charts with a dropdown menu to display the top 10 OTUs found in that unique individuals. The values, labels, and hovertext for the bar chart respectively uses sample_values, otu_ids, and otu_labels.

3. Built a bubble chart that displays the following for each sample:
-otu_ids for the x values
-sample_values for the y values
-sample_values for the marker size
-otu_ids for the marker colors
-otu_labels for the text values

4. Displayed the sample metadata, i.e, an individual's demographic information.

5. Display each key-value pair fot the metadata JSON object somewhere on the page.

6. Updated all of the plots whenever a new sample is selected. The dashboard will update whenever
a new sample is selected.
