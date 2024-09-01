
export const tableStyles = {
  border: 'none',
  '& .custom-header': {
    backgroundColor: '#F7F6F4',
    color: '#C0C0C0',
    fontWeight: '500',
    fontSize: '16px',
    textAlign: 'center',
    border: 'none !important'
  },
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: 'transparent !important'
  },
  '& .MuiDataGrid-row': {
    cursor: 'pointer'
  },
  '& .MuiDataGrid-row:hover >.custom-cell': {
    background: 'rgba(0, 0, 0, 0.02)',
    transition: '0.2s ease'
  },
  '& .MuiDataGrid-cell': {
    border: 'none'
  },
  '& .custom-cell': {
    backgroundColor: '#fff',
    color: '#0E0E2C',
    borderRadius: '12px',
    border: '1px solid #F7F6F4',
    fontSize: '16px',
    fontWeight: 500,
    textAlign: 'center'
  },
  '& .MuiDataGrid-row--borderBottom': {
    background: 'transparent !important'
  },
  '& .MuiDataGrid-columnHeaders': {
    border: 'none !important'
  }
}

export const getTableWrapperStyles = (scrollPosition: { top: number; left: number; right: number }) => {
  return {
    height: 'calc(100% - 123px - 101px)',
    padding: '0px 40px',
    position: 'relative',
    '&:before': {
      content: '""',
      display: scrollPosition.left > 0 ? 'block' : 'none',
      width: '50px',
      zIndex: 10,
      height: '65%',
      background: 'linear-gradient(to left, rgba(247, 246, 244, 0), rgba(247, 246, 244, 1))',
      position: 'absolute',
      top: '12px',
      left: '35px'
    },
    '&:after': {
      content: '""',
      display: scrollPosition.right > 0 ? 'block' : 'none',
      width: '50px',
      zIndex: 10,
      height: '65%',
      background: 'linear-gradient(to right, rgba(247, 246, 244, 0), rgba(247, 246, 244, 1))',
      position: 'absolute',
      top: '12px',
      right: '35px'
    }
  }
}
