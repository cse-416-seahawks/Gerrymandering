
import React, {Component, useState} from 'react'
import './css/TableData.css'
import { Tabs, Tab } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import { flexbox } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';

function TableData() {
  const [currentTab, setCurrentTab] = useState('1');

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
    console.log(newValue);
    setCurrentTab(String(newValue));
  }

  return (
    <>
        <TabContext value={currentTab}>
            <div className='table-container'>
                <div className='tab-container'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '95%' }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                    >
                        <Tab value='1' label='Summary of Cluster' sx={{ textTransform: "none" }} />
                        <Tab value='2' label='Average Measures' sx={{ textTransform: "none" }} />
                    </Tabs>
                </Box>
            
                </div>
                <div>
                    <TabPanel value='1'>
                        <ClusterTable/>
                    </TabPanel>
                    <TabPanel value='2'>
                        <AverageMeasuresTable/>
                    </TabPanel>
                    <TabPanel value='3'>Item Three</TabPanel>
                </div>
            
            </div>
            </TabContext>
    </>
    
  )
}

export default TableData;

/**
 * 
 * Table Data for cluster analysis
 */
function ClusterTable() {
    interface cluster_summary_table {
        cluster: number;
        num_districts: number;
        average_dist: number;
    }
    const sampleData: cluster_summary_table[] = [
        { cluster: 1, num_districts: 30, average_dist: 12.2},
        { cluster: 2, num_districts: 12, average_dist: 9.5},
        { cluster: 3, num_districts: 45, average_dist: 2.1},
        { cluster: 4, num_districts: 17, average_dist: 13.2}
    ]
    
    return (
      <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{}}>
                    <TableRow>
                        <TableCell>Cluster</TableCell>
                        <TableCell align="right"># District Plans</TableCell>
                        <TableCell align="right">Average Distances</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {sampleData.map((row) => (
                    <TableRow key={row.cluster}>
                        <TableCell component="th" scope="row"> {row.cluster} </TableCell>
                        <TableCell align="right">{row.num_districts}</TableCell>
                        <TableCell align="right">{row.average_dist}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
      </>
    )
}


/**
 * 
 * Table Data for cluster analysis
 */
 function AverageMeasuresTable() {
    

    const sampleData1 = [
        { party: 'Republican', men: '59%', women: '41%'},
        { party: 'Democrat', men: '44%', women: '56%'},
    ];

    const sampleData2 = [
        { party: 'Republican', white: '72%', black: '1%', asian: '1%', latino: '18%', other: '7%' },
        { party: 'Democrat', white: '44%', black: '14%', asian: '3%', latino: '29%', other: '10%' },
    ]
    
    return (
      <>
        {/* 

                TABLE 1 

        */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Party affiliation</TableCell>
                        <TableCell align="right">Men</TableCell>
                        <TableCell align="right">Women</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {sampleData1.map((row) => (
                    <TableRow key={row.party}>
                        <TableCell component="th" scope="row"> {row.party} </TableCell>
                        <TableCell align="right">{row.men}</TableCell>
                        <TableCell align="right">{row.women}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <br/>
        {/* 

                TABLE 2 

        */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Party affiliation</TableCell>
                        <TableCell align="right">White</TableCell>
                        <TableCell align="right">Black</TableCell>
                        <TableCell align="right">Asian</TableCell>
                        <TableCell align="right">Mixed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {sampleData2.map((row) => (
                    <TableRow key={row.party}>
                        <TableCell component="th" scope="row"> {row.party} </TableCell>
                        <TableCell align="right">{row.white}</TableCell>
                        <TableCell align="right">{row.black}</TableCell>
                        <TableCell align="right">{row.asian}</TableCell>
                        <TableCell align="right">{row.other}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
      </>
    )
}
