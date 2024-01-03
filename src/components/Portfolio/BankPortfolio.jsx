import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useColorMode,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { FaPlus, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  createPortfolio,
  deletePortfolio,
  fetchPortfolio,
} from "../../redux/thunks/portfolioThunks";
import AlertDialogue from "../Common/AlertDialogue";
import PortfolioCreationModal from "./ProfileCreationModal";

const BankPortfolioComponent = () => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const bankPortfolios = useSelector((state) => state.portfolios.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPortfolio());
    console.log(bankPortfolios)
  }, [dispatch]);

  const handleCreatePortfolio = (newPortfolio) => {
    dispatch(createPortfolio(newPortfolio));
    console.log("Create Bank Portfolio clicked", newPortfolio);
  };

  // Delete logic
  const handleDelete = (id) => {
    setPortfolioToDelete(id);
    setIsDeleteAlertOpen(true);
  };
  const handleConfirmDelete = () => {
    dispatch(deletePortfolio(portfolioToDelete));
    setIsDeleteAlertOpen(false);
  };
  const handleCloseDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bankPortfolios
    ? bankPortfolios.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

  return (
    <Flex p="4" flexDirection="column">
      <Box mb="4" textAlign="right">
        <Button
          colorScheme="teal"
          leftIcon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Bank Portfolio
        </Button>
        <PortfolioCreationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreatePortfolio={handleCreatePortfolio}
        />
      </Box>

      {bankPortfolios && bankPortfolios.length > 0 ? (
        <TableContainer
          maxH="70vh"
          overflowY="auto"
          css={{
            "::-webkit-scrollbar": {
              width: "12px",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Table variant={colorMode === "dark" ? "unstyled" : "simple"}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Invested Amount</Th>
                <Th>Symbol</Th>
                <Th>Last Updated Amount</Th>
                <Th>Investment Date</Th>
                <Th>Last Updated Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((portfolio) => (
                <Tr
                  key={portfolio._id}
                  _hover={{
                    backgroundColor:
                      colorMode === "light" ? "teal.100" : "teal.700",
                  }}
                >
                  <Td data-label="Name">{portfolio.name}</Td>
                  <Td data-label="Category">{portfolio.category}</Td>
                  <Td data-label="Invested Amount">
                    {portfolio.investedAmount}
                  </Td>
                  <Td data-label="Symbol">{portfolio.symbol}</Td>
                  <Td data-label="Last Updated Amount">
                    {portfolio.lastUpdatedAmount}
                  </Td>
                  <Td data-label="Investment Date">
                    {new Date(portfolio.investmentDate).toLocaleDateString()}
                  </Td>
                  <Td data-label="Last Updated Date">
                    {new Date(portfolio.lastUpdatedDate).toLocaleDateString()}
                  </Td>
                  <Td data-label="Actions">
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      icon={<FaEye />}
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="red"
                      icon={<MdDelete />}
                      onClick={() => handleDelete(portfolio._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text>No bank portfolios found. Create your bank portfolios!</Text>
      )}

      <Box mt="4" textAlign="center">
        {Array.from({
          length: Math.ceil(bankPortfolios.length / itemsPerPage),
        }).map((item, index) => (
          <Button
            key={index}
            size="sm"
            variant="outline"
            colorScheme={currentPage === index + 1 ? "teal" : "gray"}
            onClick={() => paginate(index + 1)}
            mx="1"
          >
            {index + 1}
          </Button>
        ))}
      </Box>
      <AlertDialogue
        isOpen={isDeleteAlertOpen}
        onClose={handleCloseDeleteAlert}
        onConfirm={handleConfirmDelete}
        title="Delete Portfolio"
        message="Are you sure you want to delete this from your Portfolio?"
      />
    </Flex>
  );
};

export default BankPortfolioComponent;

