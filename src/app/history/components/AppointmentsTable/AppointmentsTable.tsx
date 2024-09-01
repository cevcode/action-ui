import { Box } from '@mui/material'
import { DataGrid, GridRenderCellParams, useGridApiRef } from '@mui/x-data-grid'
import { HistoryOfChecksCardProps } from '@/types/HistoryOfChecks'
import InaccuracyIndicator from '@/app/history/components/InacurracyIndicator'
import React, { useEffect, useState } from 'react'
import { humanizeBoolean } from '@/helpers/helpers'
import { inaccuraciesColors } from '@/app/history/helpers/helpers'
import { useRouter } from 'next/navigation'
import { getTableWrapperStyles, tableStyles } from '@/app/history/components/AppointmentsTable/AppointmentsTable.styled'
import { GRID_DEFAULT_LOCALE_TEXT } from '@/app/history/components/AppointmentsTable/helpers'
import moment from 'moment'

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
  errorsPercent: number
  warningsPercent: number
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
          appointmentDateTime: moment(appointment.appointmentDateTime).format('DD/MM/YYYY'),
          MKB10Code: appointment.MKB10Code,
          isUnderHospitalization: humanizeBoolean(appointment.isUnderHospitalization),
          isAnamnesisCompleted: humanizeBoolean(appointment.isAnamnesisCompleted),
          isFilledStatusPraesens: humanizeBoolean(appointment.isFilledStatusPraesens),
          errorsPercent: appointment.errorsRate?.errors || 0,
          warningsPercent: appointment.errorsRate?.warnings || 0
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
          selectable: false,
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
          selectable: false,
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
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'doctorFullName',
          headerName: 'ФИО врача',
          width: 160,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'clinic',
          headerName: 'Клиника',
          width: 120,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'clinicDepartment',
          headerName: 'Отделение',
          width: 130,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'doctorSpecialty',
          headerName: 'Специальность',
          width: 130,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'patientId',
          headerName: 'ID пациента',
          width: 230,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'appointmentDateTime',
          headerName: 'Дата/время приема',
          width: 200,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'MKB10Code',
          headerName: 'Код МКБ-10',
          width: 500,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'isUnderHospitalization',
          headerName: 'Отправлен на госпитализацию',
          width: 280,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'isAnamnesisCompleted',
          headerName: 'Заполнен анамнез',
          width: 160,
          selectable: false,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell'
        },
        {
          field: 'errorsRate',
          headerName: 'Процент ошибок',
          filterable: false,
          sortable: false,
          selectable: false,
          disableColumnMenu: true,
          width: 160,
          headerClassName: 'custom-header',
          cellClassName: 'custom-cell',
          renderCell: (params: GridRenderCellParams<TableRowModel>) => {
            return (
              <Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <InaccuracyIndicator total={params.row.warningsPercent} text='%' type='warning' />
                  <InaccuracyIndicator total={params.row.errorsPercent} text='%' type='error' />
                </Box>
                <Box
                  sx={{ display: 'flex', width: '100%', background: '#F3F3F3', borderRadius: '12px', height: '6px', overflow: 'hidden' }}
                >
                  <Box
                    sx={{
                      background: inaccuraciesColors.warning,
                      width: `${params.row.warningsPercent}%`,
                    }}
                  />
                  <Box
                    sx={{
                      background: inaccuraciesColors.error,
                      width: `${params.row.errorsPercent}%`,
                    }}
                  />
                </Box>
              </Box>
            )
          }
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
    <Box sx={getTableWrapperStyles(scrollPosition)}>
      {scrollPosition.left > 0 ? (
        <div style={{ overflow: 'hidden', height: '84%', width: '8px', left: '0', position: 'absolute', top: '60px' }}>
          {rows.map((row, index) => {
            const top = index * 52 - scrollPosition.top
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
          })}
        </div>
      ) : null}
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={GRID_DEFAULT_LOCALE_TEXT}
        initialState={{}}
        onRowClick={params => router.push(`/history/${params.row.appointmentId}`)}
        apiRef={apiRef}
        sx={tableStyles}
      />
    </Box>
  )
}

export default AppointmentsTable
