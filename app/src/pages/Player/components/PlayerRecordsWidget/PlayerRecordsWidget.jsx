import React from 'react';
import PropTypes from 'prop-types';
import TableList from '../../../../components/TableList';
import { capitalize, getSkillIcon, formatDate } from '../../../../utils';
import './PlayerRecordsWidget.scss';

const TABLE_CONFIG = {
  uniqueKey: row => `${row.period}/${row.metric}`,
  columns: [
    {
      key: 'period',
      className: () => '-primary',
      transform: value => capitalize(value)
    },
    {
      key: 'value',
      formatNumbers: true,
      className: value => (value > 0 ? '-positive' : ''),
      transform: value => (value > 0 ? `+${value}` : value)
    },
    {
      key: 'updatedAt',
      width: 110,
      transform: value => formatDate(value, 'DD MMM, YYYY')
    }
  ]
};

function PlayerRecordsWidget({ records, metric }) {
  if (!records) {
    return null;
  }

  const filteredRecords = records.filter(r => r.metric === metric);

  return (
    <div className="player-records-widget">
      <div className="widget-header">
        <img src={getSkillIcon(metric)} alt="" />
        <b className="widget-title">{capitalize(metric)}</b>
      </div>
      <div className="widget-body">
        <TableList
          rows={filteredRecords}
          uniqueKeySelector={TABLE_CONFIG.uniqueKey}
          columns={TABLE_CONFIG.columns}
        />
      </div>
    </div>
  );
}

PlayerRecordsWidget.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape).isRequired,
  metric: PropTypes.string.isRequired
};

export default React.memo(PlayerRecordsWidget);
