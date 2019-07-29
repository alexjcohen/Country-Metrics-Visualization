### This script is used to combine the downloaded excel/csv files into one common dataframe for use in developing our visualizations

## install packages if not already installed
# install.packages("dplyr")
# install.packages("data.table")
# install.packages("magrittr")
# install.packages("stringr")
# install.packages("bit64")

# load relevant packages
library(dplyr)
library(data.table)
library(magrittr)
library(stringr)
library(bit64)
options(scipen = 999)

# read in extracted CSV files
gdp <- fread("C://wamp64/www/project_1/data/gdp_abs.csv",        header = TRUE)
edu <- fread("C://wamp64/www/project_1/data/education.csv",      header = TRUE)
mil <- fread("C://wamp64/www/project_1/data/military_abs.csv",   header = TRUE)
hlt <- fread("C://wamp64/www/project_1/data/healthcare_rel.csv", header = TRUE)
pop <- fread("C://wamp64/www/project_1/data/population.csv",     header = TRUE)

gdp_per_capita <- fread("C://wamp64/www/project_1/data/gdp_per_capita.csv", header = TRUE)
metadata <- fread("C://wamp64/www/project_1/data/country_metadata.csv",     header = TRUE)

# filter the education extract to relevant metric
edu <- edu[`Indicator Name` == "Government expenditure on education, total (% of GDP)"]

# subset to the g20 countries (excluding EU) and add one extra country from each continent to make any maps more interesting and add geographic diversity

g20_plus <- c(
              "Argentina", 
              "Australia", 
              "Brazil", 
              "Canada",
              "China", 
              "France", 
              "Germany", 
              "India", 
              # "Indonesia", 
              "Italy", 
              "Japan", 
              # "Mexico", 
              "Russian Federation", 
              "Saudi Arabia", 
              "South Africa", 
              "Korea, Rep.", 
              "Turkey",
              "United Kingdom",
              "United States"
              # "New Zealand",  # Oceana
              # "Colombia",   # South America
              # "Thailand",    # Asia
              # "Nigeria",     # Africa
              # "Netherlands", # Europe
              # "Guatemala") # Central America
              )
# replace name spaces with underscores for ease of computation
names(gdp) %<>% str_replace(" ", "_")
names(edu) %<>% str_replace(" ", "_")
names(mil) %<>% str_replace(" ", "_")
names(hlt) %<>% str_replace(" ", "_")
names(pop) %<>% str_replace(" ", "_")

# update metadata names
names(metadata) %<>% str_replace(" ", "_")
names(gdp_per_capita) %<>% str_replace(" ", "_")


# filter for countries in the G20+ list
gdp %<>% filter(Country_Name %in% g20_plus) %>% setDT()
edu %<>% filter(Country_Name %in% g20_plus) %>% setDT()
mil %<>% filter(Country_Name %in% g20_plus) %>% setDT()
hlt %<>% filter(Country_Name %in% g20_plus) %>% setDT()
pop %<>% filter(Country_Name %in% g20_plus) %>% setDT()

gdp_per_capita %<>% filter(Country_Name %in% g20_plus) %>% setDT()

# set the sequence of years to look at
year <- 2010
years <- seq(year, 2015, 1)

# create the total list of columns
cols <- c("Country_Name", "Country_Code", eval(years))

# subset each data frame to just the relevant columns
gdp <- gdp[, ..cols]
edu <- edu[, ..cols]
mil <- mil[, ..cols]
hlt <- hlt[, ..cols]
pop <- pop[, ..cols]

gdp_per_capita <- gdp_per_capita[, ..cols]

# append an indicator denoting which field is captured
gdp %<>% mutate(indicator = "GDP")        %>% setDT() # absolute
edu %<>% mutate(indicator = "Education")  %>% setDT() # % GDP
mil %<>% mutate(indicator = "Military")   %>% setDT() # abs
hlt %<>% mutate(indicator = "Healthcare") %>% setDT() # % GDP
pop %<>% mutate(indicator = "Population") %>% setDT() # abs

gdp_per_capita %<>% mutate(indicator = "GDP_Per_Capita") %>% setDT() # abs

years_str <- as.character(years)

##### Education Conversions #####

# convert % GDP of Education to absolute dollars by multiplying the yearly values by the total yearly GDP
edu_abs <- cbind(edu[, .(Country_Name, Country_Code)], 
                (edu[, ..years_str]/100) * gdp[, ..years_str], 
                edu$indicator) %>% setDT()

edu_per_capita <- cbind(edu_abs[, .(Country_Name, Country_Code)], 
                        (edu_abs[, ..years_str] / pop[, ..years_str]), 
                        edu_abs$indicator) %>% setDT()

# fwrite(edu_per_capita, "C:/wamp64/www/project_1/data/education_per_capita.csv")


##################################
##### Healthcare Conversions #####
##################################

# convert % GDP of Healthcare to absolute dollars by multiplying the yearly values by the total yearly GDP

hlt_abs <- cbind(hlt[, .(Country_Name, Country_Code)], 
                (hlt[, ..years_str]/100) * (gdp[, ..years_str]), 
                 hlt$indicator) %>% setDT()

# get healhcare per capita as
hlt_per_cap <- cbind(hlt[, .(Country_Name, Country_Code)], 
               (hlt_abs[, ..years_str]) / (pop[, ..years_str]), 
               hlt$indicator) %>% setDT()

# fwrite(hlt_per_cap, "C:/wamp64/www/project_1/data/hlt_per_capita_clean.csv")

################################
##### Military Conversions #####
################################

# convert absolute dollars of Military to % GDP by dividng the yearly values by the total yearly GDP

mil_rel <- cbind(mil[, .(Country_Name, Country_Code)], 
                (mil[, ..years_str] / gdp[, ..years_str])*100, 
                mil$indicator) %>% setDT() 

data <- rbind(gdp, edu, mil, hlt, pop) 
data %<>% arrange(Country_Name) %>% setDT()

## military spending per capita
mil_per_capita <- cbind(mil[, .(Country_Name, Country_Code)], 
                        (mil[, ..years_str] / pop[, ..years_str]), 
                        mil$indicator) %>% setDT()

# fwrite(mil_per_capita, "C:/wamp64/www/project_1/data/mil_per_capita_clean.csv")


#########################################
##### Healthcare Growth Conversions #####
#########################################


# calculate health growth as a percentage of GDP as well as absolute spending

hlt_growth_perGDP <- hlt %>% mutate(y2010 = 0,
                                    y2011 = (`2011` - `2010`)/100, 
                                    y2012 = (`2012` - `2011`)/100, 
                                    y2013 = (`2013` - `2012`)/100, 
                                    y2014 = (`2014` - `2013`)/100, 
                                    y2015 = (`2015` - `2014`)/100) %>%
                        select(Country_Name, y2010, y2011, y2012, y2013, y2014, y2015) %>% t() %>%
                        as.data.frame(row.names = T)

hlt_growth_abs <- hlt_abs %>% mutate(y2010 = 0,
                                     y2011 = (`2011` - `2010`)/1000000, 
                                     y2012 = (`2012` - `2011`)/1000000, 
                                     y2013 = (`2013` - `2012`)/1000000, 
                                     y2014 = (`2014` - `2013`)/1000000, 
                                     y2015 = (`2015` - `2014`)/1000000) %>%
  select(Country_Name, y2010, y2011, y2012, y2013, y2014, y2015) %>% t() %>%
  as.data.frame(row.names = T)

# fwrite(hlt_growth_perGDP, "C:/wamp64/www/project_1/data/health_growth_per_gdp.csv")
# fwrite(hlt_growth_abs,    "C:/wamp64/www/project_1/data/health_growth_abs_mil.csv")

########################################
##### Education Growth Conversions #####
########################################
edu_growth_perGDP <- edu %>% mutate(y2010 = 0,
                                    y2011 = (`2011` - `2010`)/100, 
                                    y2012 = (`2012` - `2011`)/100, 
                                    y2013 = (`2013` - `2012`)/100, 
                                    y2014 = (`2014` - `2013`)/100, 
                                    y2015 = (`2015` - `2014`)/100) %>%
  select(Country_Name, y2010, y2011, y2012, y2013, y2014, y2015) %>% t() %>%
  as.data.frame(row.names = T)

edu_growth_abs <- edu_abs %>% mutate(y2010 = 0,
                                     y2011 = (`2011` - `2010`)/1000000, 
                                     y2012 = (`2012` - `2011`)/1000000, 
                                     y2013 = (`2013` - `2012`)/1000000, 
                                     y2014 = (`2014` - `2013`)/1000000, 
                                     y2015 = (`2015` - `2014`)/1000000) %>%
  select(Country_Name, y2010, y2011, y2012, y2013, y2014, y2015) %>% t() %>%
  as.data.frame(row.names = T)

# fwrite(edu_growth_perGDP, "C:/wamp64/www/project_1/data/education_growth_per_gdp.csv")
# fwrite(edu_growth_abs,    "C:/wamp64/www/project_1/data/education_growth_abs_mil.csv")


###########################
##### GDP Conversions #####
###########################


gdp_per_capita %<>% left_join(metadata[, .(Country_Code, Region, IncomeGroup)], "Country_Code") %>% setDT()

gdp_per_capita[, region_style := case_when(Region == "Latin America & Carribbean" ~ "#d11141", 
                                           Region == "East Asia & Pacific" ~ "#00b159", 
                                           Region == "North America" ~ "#00aedb", 
                                           Region == "Europe & Central Asia" ~ "#f37735", 
                                           Region == "South Asia" ~ "#ffc425", 
                                           Region == "Sub-Saharan Africa" ~ "#803790", 
                                           TRUE ~ "#C9C0BB")]

# fwrite(gdp_per_capita, "C:/wamp64/www/project_1/data/gdp_per_capita_clean.csv")


###################################
##### Total Spending Analysis #####
###################################

setDT(gdp)
setDT(mil)
setDT(edu_abs)
setDT(hlt_abs)

edu_abs[is.na(edu_abs)] <- 0

gdp_bil <- cbind(gdp[, .(Country_Name, Country_Code)], 
                 gdp[, ..years_str] / 1000000000)

edu_abs_bil <- cbind(edu_abs[, .(Country_Name, Country_Code)], 
                     edu_abs[, ..years_str] / 1000000000)

mil_bil <- cbind(mil[, .(Country_Name, Country_Code)], 
                 mil[, ..years_str] / 1000000000)

hlt_abs_bil <- cbind(hlt_abs[, .(Country_Name, Country_Code)], 
                     hlt_abs[, ..years_str] / 1000000000)


other_spend_bil <- cbind(gdp[, .(Country_Name, Country_Code)], 
                     (gdp[, ..years_str] - mil[, ..years_str] - edu_abs[, ..years_str] -      
                     hlt_abs[, ..years_str])/1000000000)

# fwrite(other_spend_bil, "C:/wamp64/www/project_1/data/other_spend_total.csv")
# fwrite(mil_bil,         "C:/wamp64/www/project_1/data/mil_spend_total.csv")
# fwrite(edu_abs_bil,     "C:/wamp64/www/project_1/data/education_spend_total.csv")
# fwrite(hlt_abs_bil,     "C:/wamp64/www/project_1/data/healthcare_spend_total.csv")
