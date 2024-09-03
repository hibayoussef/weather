import React from "react";

interface SearchFieldProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ placeholder, onSearch }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = (event.target as any).searchInput.value;
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="searchInput"
        placeholder={placeholder}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto", // Center the form horizontally
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    marginRight: "10px",
    fontSize: "16px",
    width: "100%", // Ensure it takes full width
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default SearchField;
