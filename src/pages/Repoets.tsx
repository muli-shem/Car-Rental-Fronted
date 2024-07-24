import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Divider, Avatar, Modal, Backdrop, Fade } from '@mui/material';
import { SaveAlt as SaveAltIcon, AttachMoney, Book, Person, LocationOn, SupportAgent } from '@mui/icons-material';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Reports: React.FC = () => {
  const [Payments, setPayments] = useState<any[]>([]);
  const [Bookings, setBookings] = useState<any[]>([]);
  const [Users, setUsers] = useState<any[]>([]);
  const [Locations, setLocations] = useState<any[]>([]);
  const [Tickets, setTickets] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [reportTitle, setReportTitle] = useState('');

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get('https://car-renting-project.onrender.com/api/Payments'),
        axios.get('https://car-renting-project.onrender.com/api/Bookings'),
        axios.get('https://car-renting-project.onrender.com/api/Users'),
        axios.get('https://car-renting-project.onrender.com/api/Locations'),
        axios.get('https://car-renting-project.onrender.com/api/Tickets'),
      ]);

      setPayments(responses[0].data);
      setBookings(responses[1].data);
      setUsers(responses[2].data);
      setLocations(responses[3].data);
      setTickets(responses[4].data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = (data: any[], title: string) => {
    setSelectedReport(data);
    setReportTitle(title);
    setOpenModal(true);
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('report-content');

    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${reportTitle}.pdf`);
    }
  };

  const handleConfirmDownload = () => {
    setOpenModal(false);
    setTimeout(handleDownloadPDF, 500); // Ensure the modal is closed before starting the download
  };

  // Calculate total counts for each category
  const totalPayments = Payments.length;
  const totalBookings = Bookings.length;
  const totalUsers = Users.length;
  const totalLocations = Locations.length;
  const totalTickets = Tickets.length;

  const statCards = [
    { title: 'Payments Report', count: totalPayments, icon: <AttachMoney fontSize="large" />, color: '#4caf50', data: Payments },
    { title: 'Bookings Report', count: totalBookings, icon: <Book fontSize="large" />, color: '#2196f3', data: Bookings },
    { title: 'Users Report', count: totalUsers, icon: <Person fontSize="large" />, color: '#9c27b0', data: Users },
    { title: 'Locations Report', count: totalLocations, icon: <LocationOn fontSize="large" />, color: '#ff9800', data: Locations },
    { title: 'Customer Support Tickets Report', count: totalTickets, icon: <SupportAgent fontSize="large" />, color: '#f44336', data: Tickets },
  ];

  const chartData = {
    labels: ['Payments', 'Bookings', 'Users', 'Locations', 'Tickets'],
    datasets: [
      {
        label: 'Data Distribution',
        data: [totalPayments, totalBookings, totalUsers, totalLocations, totalTickets],
        backgroundColor: ['#4caf50', '#2196f3', '#9c27b0', '#ff9800', '#f44336'],
      },
    ],
  };

  return (
    <Box p={4}>
      <Typography variant="h2" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={4}>
        {statCards.map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              onClick={() => handleOpenModal(card.data, card.title)}
              style={{
                borderLeft: `6px solid ${card.color}`,
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                borderRadius: '8px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <CardContent>
                <Avatar style={{ backgroundColor: card.color, marginBottom: '16px', width: '56px', height: '56px' }}>
                  {card.icon}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {card.title} ({card.count})
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Data Distribution
        </Typography>
        <Box width="100%" maxWidth="600px" mx="auto">
          <Pie data={chartData} />
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            component="div"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '800px',
              backgroundColor: 'white',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              padding: '24px',
              borderRadius: '8px'
            }}
          >
            <Typography variant="h4" gutterBottom>
              {reportTitle}
            </Typography>
            <Box id="report-content" p={2} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {selectedReport.map((item: any, index: number) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">
                    {Object.entries(item).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {value as React.ReactNode}
                      </div>
                    ))}
                  </Typography>
                  {index !== selectedReport.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
            <Box mt={4} textAlign="right">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveAltIcon />}
                onClick={handleConfirmDownload}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Reports;
