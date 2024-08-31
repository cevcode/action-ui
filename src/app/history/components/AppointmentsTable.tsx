import { Box } from '@mui/material'
import { DataGrid, GridRenderCellParams, useGridApiRef } from '@mui/x-data-grid'
import { HistoryOfChecksCardProps } from '@/types/HistoryOfChecks'
import InaccuracyIndicator from '@/app/history/components/InacurracyIndicator'
import React, { useEffect, useRef, useState } from 'react'
import { humanizeBoolean } from '@/helpers/helpers'
import { inaccuraciesColors } from '@/app/history/helpers/helpers'
import { useRouter } from 'next/navigation'

interface AppointmentsTableProps {
  appointments: HistoryOfChecksCardProps[]
  totalWarningInaccuracies: number
  totalErrorInaccuracies: number
}

interface TableRowModel {
  id: number
  appointmentId: number
  totalInaccuracyErrors: number
  totalInaccuracyWarnings: number
  doctorFullName: string
  clinic: string
  clinicDepartment: string
  doctorSpecialty: string
  patientId: number
  patientFullName: string
  appointmentDateTime: string
  MKB10Code: string
  isUnderHospitalization: string
  isAnamnesisCompleted: string
  isFilledStatusPraesens: string
}
const AppointmentsTable = ({
  appointments,
  totalWarningInaccuracies,
  totalErrorInaccuracies
}: AppointmentsTableProps) => {
  const router = useRouter()
  const apiRef = useGridApiRef()
  const [scrollPosition, setScrollPosition] = useState<{ top: number; left: number; right: number }>({
    top: 0,
    left: 0,
    right: 0
  })

  useEffect(() => {
    return apiRef.current.subscribeEvent('scrollPositionChange', () => {
      const { top, left } = apiRef.current.getScrollPosition()
      const scrollArea =
        apiRef.current.state.dimensions.rowWidth - apiRef.current.state.dimensions.viewportInnerSize.width
      setScrollPosition({ top, left, right: scrollArea - left })
    })
  }, [apiRef.current])

  const getIndicatorColor = (totalInaccuracyErrors: number, totalInaccuracyWarnings: number) => {
    if (totalInaccuracyErrors > 0) {
      return {
        gradient: 'linear-gradient(to right, #F1361D00, #F1361D)',
        color: inaccuraciesColors.error
      }
    }
    if (totalInaccuracyWarnings > 0) {
      return {
        gradient: 'linear-gradient(to right, #FFB54500, #FFB545)',
        color: inaccuraciesColors.warning
      }
    }
    return {
      gradient: 'transparent',
      color: 'transparent'
    }
  }

  const prepareTableData = () => {
    const getRows = (): TableRowModel[] => {
      return appointments.map(appointment => {
        return {
          id: appointment.id,
          appointmentId: appointment.appointmentId,
          totalInaccuracyErrors: appointment.inaccuracies.filter(inaccuracy => inaccuracy.type === 'error').length,
          totalInaccuracyWarnings: appointment.inaccuracies.filter(inaccuracy => inaccuracy.type === 'warning').length,
          doctorFullName: appointment.doctorFullName,
          clinic: appointment.clinic,
          clinicDepartment: appointment.clinicDepartment,
          doctorSpecialty: appointment.doctorSpecialty,
          patientId: appointment.patientId,
          patientFullName: appointment.patientFullName,
          appointmentDateTime: appointment.appointmentDateTime,
          MKB10Code: appointment.MKB10Code,
          isUnderHospitalization: humanizeBoolean(appointment.isUnderHospitalization),
          isAnamnesisCompleted: humanizeBoolean(appointment.isAnamnesisCompleted),
          isFilledStatusPraesens: humanizeBoolean(appointment.isFilledStatusPraesens)
        }
      })
    }

    const getColumns = () => {
      return [
        {
          field: 'inaccuraciesIndicator',
          headerName: ' ',
          filterable: false,
          sortable: false,
          disableColumnMenu: true,
          width: 40,
          headerClassName: 'custom-header',
          renderCell: (params: GridRenderCellParams<TableRowModel>) => {
            return (
              <Box
                sx={{
                  opacity: '0.5',
                  width: '40px',
                  height: '40px',
                  marginTop: '4px',
                  background: getIndicatorColor(params.row.totalInaccuracyErrors, params.row.totalInaccuracyWarnings)
                    .gradient
                }}
              />
            )
          }
        },
        {
          field: 'inaccuracies',
          headerName: 'Ошибки',
          filterable: false,
          sortable: false,
          disableColumnMenu: true,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell',
          renderCell: (params: GridRenderCellParams<TableRowModel>) => {
            return (
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: '8px'
                }}
              >
                <InaccuracyIndicator total={params.row.totalInaccuracyWarnings} type='warning' />
                <InaccuracyIndicator total={params.row.totalInaccuracyErrors} type='error' />
              </Box>
            )
          },
          renderHeader: () => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: '8px'
                }}
              >
                <InaccuracyIndicator total={totalWarningInaccuracies} type='warning' />
                <InaccuracyIndicator total={totalErrorInaccuracies} type='error' />
              </Box>
            )
          }
        },
        {
          field: 'appointmentId',
          headerName: 'ID приема',
          width: 130,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'doctorFullName',
          headerName: 'ФИО врача',
          width: 160,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'clinic',
          headerName: 'Клиника',
          width: 120,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'clinicDepartment',
          headerName: 'Отделение',
          width: 130,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'doctorSpecialty',
          headerName: 'Специальность',
          width: 130,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'patientId',
          headerName: 'ID пациента',
          width: 230,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'appointmentDateTime',
          headerName: 'Дата/время приема',
          width: 200,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'MKB10Code',
          headerName: 'Код МКБ-10',
          width: 500,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'isUnderHospitalization',
          headerName: 'Отправлен на госпитализацию',
          width: 280,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'isAnamnesisCompleted',
          headerName: 'Заполнен анамнез',
          width: 160,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        }
      ]
    }

    return {
      rows: getRows(),
      columns: getColumns()
    }
  }

  const { rows, columns } = prepareTableData()

  return (
    <Box
      sx={{
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
      }}
    >
      {scrollPosition.left > 0
        ? rows.map((row, index) => {
            const top = index * 52 + 60
            return (
              <div
                key={row.id}
                style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: 0,
                  width: '8px',
                  borderRadius: '0 8px 8px 0',
                  height: '45px',
                  background: getIndicatorColor(row.totalInaccuracyErrors, row.totalInaccuracyWarnings).color,
                  pointerEvents: 'none',
                  zIndex: 5
                }}
              />
            )
          })
        : null}
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{}}
        onRowClick={params => router.push(`/history/${params.row.appointmentId}`)}
        apiRef={apiRef}
        sx={{
          border: 'none',
          '& .custom-header': {
            backgroundColor: 'transparent',
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
            cursor: 'pointer',
          },
          '& .MuiDataGrid-row:hover >.custom-cell': {
            background: 'rgba(0, 0, 0, 0.02)',
            transition: '0.2s ease'
          },
          '& .MuiDataGrid-cell': {
            border: 'none',
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
        }}
      />
    </Box>
  )
}

export default AppointmentsTable
