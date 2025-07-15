import React, { useState, useEffect } from 'react';
import './TeamMembers.css';
import { FiSearch, FiFilter, FiMoreHorizontal } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import api from '../Service/Api';

const ALLOWED_POSITIONS = [
  'massage-therapist',
  'esthetician',
  'nail-technician',
  'hair-stylist',
  'wellness-coach',
  'receptionist',
  'manager',
  'supervisor'
];
const ALLOWED_DEPARTMENTS = [
  'spa-services',
  'wellness',
  'beauty',
  'administration',
  'customer-service'
];

const ALLOWED_SPECIALIZATIONS = [
  'deep-tissue-massage', 'swedish-massage', 'hot-stone-massage', 'aromatherapy',
  'facial-treatments', 'anti-aging-treatments', 'acne-treatments', 'manicure',
  'pedicure', 'gel-nails', 'hair-removal', 'body-wraps', 'wellness-coaching'
];
const ALLOWED_LANGUAGES = [
  'English', 'Arabic', 'Hindi', 'Urdu', 'Tagalog', 'Russian', 'Chinese', 'French', 'German'
];
const ALLOWED_PROFICIENCY = ['basic', 'intermediate', 'fluent', 'native'];
const ALLOWED_SKILL_LEVEL = ['beginner', 'intermediate', 'advanced', 'expert'];

const AVAILABILITY_TYPES = ['vacation', 'sick-leave', 'training', 'personal', 'other'];

const getNextEmployeeId = (teamMembers) => {
  // Find all IDs matching EMP###
  const ids = teamMembers
    .map(m => m.employeeId || m.id || "")
    .map(id => {
      const match = id.match(/^EMP(\d{3,})$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter(num => num !== null);
  const max = ids.length > 0 ? Math.max(...ids) : 0;
  const nextNum = max + 1;
  return `EMP${String(nextNum).padStart(3, '0')}`;
};

const AddTeamMemberModal = ({ isOpen, onClose, onAdd, suggestedEmployeeId }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    employeeId: suggestedEmployeeId || '',
    position: '',
    department: '',
    hireDate: '',
    salary: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update employeeId if suggestedEmployeeId changes (when modal opens)
  React.useEffect(() => {
    setForm(f => ({ ...f, employeeId: suggestedEmployeeId || '' }));
  }, [suggestedEmployeeId, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 1. Create user
      const userRes = await api.post('/auth/signup', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });
      const userId = userRes.data.data.user.id || userRes.data.data.user._id;
      // 2. Create employee
      await api.post('/employees', {
        userId,
        employeeId: form.employeeId,
        position: form.position,
        department: form.department,
        hireDate: form.hireDate,
        salary: Number(form.salary),
      });
      onAdd();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to add team member. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Team Member</h2>
        <form onSubmit={handleSubmit} className="add-team-form">
          <div className="form-row">
            <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
            <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required type="password" />
          </div>
          <div className="form-row">
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <select name="position" value={form.position} onChange={handleChange} required>
              <option value="">Select Position</option>
              {ALLOWED_POSITIONS.map(pos => (
                <option key={pos} value={pos}>{pos.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
              ))}
            </select>
            <select name="department" value={form.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              {ALLOWED_DEPARTMENTS.map(dep => (
                <option key={dep} value={dep}>{dep.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <input name="hireDate" placeholder="Hire Date" value={form.hireDate} onChange={handleChange} type="date" required />
            <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} type="number" min="0" required />
          </div>
          {error && <div className="form-error">{error}</div>}
          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditTeamMemberModal = ({ isOpen, onClose, employee, onSave }) => {
  const [form, setForm] = useState({
    specializations: employee?.specializations || [],
    skills: employee?.skills || [],
    languages: employee?.languages || [],
    workSchedule: employee?.workSchedule || {},
    availability: employee?.availability || { isAvailable: true, unavailableDates: [] },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setForm({
      specializations: employee?.specializations || [],
      skills: employee?.skills || [],
      languages: employee?.languages || [],
      workSchedule: employee?.workSchedule || {},
      availability: employee?.availability || { isAvailable: true, unavailableDates: [] },
    });
  }, [employee, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSpecializationChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setForm(f => ({ ...f, specializations: value }));
  };

  const handleSkillChange = (idx, field, value) => {
    setForm(f => {
      const skills = [...f.skills];
      skills[idx] = { ...skills[idx], [field]: value };
      return { ...f, skills };
    });
  };

  const addSkill = () => {
    setForm(f => ({ ...f, skills: [...f.skills, { name: '', level: '', yearsOfExperience: '' }] }));
  };
  const removeSkill = (idx) => {
    setForm(f => {
      const skills = [...f.skills];
      skills.splice(idx, 1);
      return { ...f, skills };
    });
  };

  const handleLanguageChange = (idx, field, value) => {
    setForm(f => {
      const languages = [...f.languages];
      languages[idx] = { ...languages[idx], [field]: value };
      return { ...f, languages };
    });
  };
  const addLanguage = () => {
    setForm(f => ({ ...f, languages: [...f.languages, { language: '', proficiency: '' }] }));
  };
  const removeLanguage = (idx) => {
    setForm(f => {
      const languages = [...f.languages];
      languages.splice(idx, 1);
      return { ...f, languages };
    });
  };

  // Availability handlers
  const handleAvailabilityToggle = (e) => {
    setForm(f => ({ ...f, availability: { ...f.availability, isAvailable: e.target.checked } }));
  };
  const handleUnavailableDateChange = (idx, field, value) => {
    setForm(f => {
      const unavailableDates = [...(f.availability.unavailableDates || [])];
      unavailableDates[idx] = { ...unavailableDates[idx], [field]: value };
      return { ...f, availability: { ...f.availability, unavailableDates } };
    });
  };
  const addUnavailableDate = () => {
    setForm(f => ({
      ...f,
      availability: {
        ...f.availability,
        unavailableDates: [...(f.availability.unavailableDates || []), { startDate: '', endDate: '', reason: '', type: '' }]
      }
    }));
  };
  const removeUnavailableDate = (idx) => {
    setForm(f => {
      const unavailableDates = [...(f.availability.unavailableDates || [])];
      unavailableDates.splice(idx, 1);
      return { ...f, availability: { ...f.availability, unavailableDates } };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.patch(`/employees/${employee.id}`, form);
      onSave();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update team member.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !employee) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Team Member Details</h2>
        <form onSubmit={handleSubmit} className="add-team-form">
          <div className="form-row">
            <label className="edit-section-label">Specializations</label>
            <select multiple name="specializations" value={form.specializations} onChange={handleSpecializationChange}>
              {ALLOWED_SPECIALIZATIONS.map(spec => (
                <option key={spec} value={spec}>{spec.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="edit-section-label">Skills</label>
            {form.skills.map((skill, idx) => (
              <div key={idx} className="edit-dynamic-card">
                <input placeholder="Skill Name" value={skill.name} onChange={e => handleSkillChange(idx, 'name', e.target.value)} />
                <select value={skill.level} onChange={e => handleSkillChange(idx, 'level', e.target.value)}>
                  <option value="">Level</option>
                  {ALLOWED_SKILL_LEVEL.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
                <input type="number" min="0" placeholder="Years" value={skill.yearsOfExperience} onChange={e => handleSkillChange(idx, 'yearsOfExperience', e.target.value)} />
                <button type="button" className="edit-remove-btn" onClick={() => removeSkill(idx)} title="Remove">&minus;</button>
              </div>
            ))}
            <button type="button" className="edit-add-btn" onClick={addSkill}>+ Add Skill</button>
          </div>
          <div className="form-row">
            <label className="edit-section-label">Languages</label>
            {form.languages.map((lang, idx) => (
              <div key={idx} className="edit-dynamic-card">
                <select value={lang.language} onChange={e => handleLanguageChange(idx, 'language', e.target.value)}>
                  <option value="">Language</option>
                  {ALLOWED_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <select value={lang.proficiency} onChange={e => handleLanguageChange(idx, 'proficiency', e.target.value)}>
                  <option value="">Proficiency</option>
                  {ALLOWED_PROFICIENCY.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <button type="button" className="edit-remove-btn" onClick={() => removeLanguage(idx)} title="Remove">&minus;</button>
              </div>
            ))}
            <button type="button" className="edit-add-btn" onClick={addLanguage}>+ Add Language</button>
          </div>
          <div className="form-row">
            <label className="edit-section-label">Availability</label>
            <div style={{ marginBottom: 8 }}>
              <label>
                <input type="checkbox" checked={form.availability.isAvailable} onChange={handleAvailabilityToggle} />
                Is Available
              </label>
            </div>
            <div>
              <label>Unavailable Dates</label>
              {(form.availability.unavailableDates || []).map((ud, idx) => (
                <div key={idx} className="edit-dynamic-card">
                  <input type="date" value={ud.startDate || ''} onChange={e => handleUnavailableDateChange(idx, 'startDate', e.target.value)} />
                  <input type="date" value={ud.endDate || ''} onChange={e => handleUnavailableDateChange(idx, 'endDate', e.target.value)} />
                  <input placeholder="Reason" value={ud.reason || ''} onChange={e => handleUnavailableDateChange(idx, 'reason', e.target.value)} />
                  <select value={ud.type || ''} onChange={e => handleUnavailableDateChange(idx, 'type', e.target.value)}>
                    <option value="">Type</option>
                    {AVAILABILITY_TYPES.map(t => <option key={t} value={t}>{t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
                  </select>
                  <button type="button" className="edit-remove-btn" onClick={() => removeUnavailableDate(idx)} title="Remove">&minus;</button>
                </div>
              ))}
              <button type="button" className="edit-add-btn" onClick={addUnavailableDate}>+ Add Unavailable Date</button>
            </div>
          </div>
          {/* You can add workSchedule editing here if needed */}
          {error && <div className="form-error">{error}</div>}
          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TeamMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/employees');
      const employees = res.data.data.employees || [];
      const mapped = employees.map((emp) => ({
        id: emp._id,
        name: emp.user ? `${emp.user.firstName || ''} ${emp.user.lastName || ''}`.trim() : emp.employeeId || 'Unknown',
        email: emp.user?.email || '',
        phone: emp.phone || '',
        status: emp.isActive === false ? 'Inactive' : 'Active',
        statusColor: emp.isActive === false ? '#b46900' : '#2ecc40',
        avatar: emp.user?.firstName ? emp.user.firstName[0].toUpperCase() : 'U',
        avatarBg: '#f1e7ff',
        avatarColor: '#8846d3',
        rating: emp.performance?.ratings?.average || null,
        reviewCount: emp.performance?.ratings?.count || null,
      }));
      setTeamMembers(mapped);
    } catch (err) {
      setError('Failed to load team members.');
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute next employee ID for the modal
  const suggestedEmployeeId = getNextEmployeeId(teamMembers);

  return (
    <div className="team-members-container">
      <AddTeamMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={fetchTeamMembers}
        suggestedEmployeeId={suggestedEmployeeId}
      />
      <EditTeamMemberModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        employee={editEmployee}
        onSave={fetchTeamMembers}
      />
      <div className="team-members-wrapper">
        {/* Header */}
        <div className="team-header">
          <div className="team-title-section">
            <h1 className="team-title">Team members</h1>
            <span className="team-count">{filteredMembers.length}</span>
          </div>
          <div className="team-header-actions">
            <button className="team-options-btn">
              <span>Options</span>
              <MdKeyboardArrowDown size={16} />
            </button>
            <button className="team-add-btn" onClick={() => setShowAddModal(true)}>Add</button>
          </div>
        </div>
        {/* Search and Filters */}
        <div className="team-controls">
          <div className="team-search-wrapper">
            <FiSearch className="team-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search team members"
              className="team-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Loading/Error States */}
        {loading && <div style={{ textAlign: 'center', margin: '2rem' }}>Loading team members...</div>}
        {error && <div style={{ color: 'red', textAlign: 'center', margin: '2rem' }}>{error}</div>}
        {/* Table */}
        <div className="team-table-container">
          <div className="team-table-wrapper">
            <table className="team-table">
              <thead className="team-table-header">
                <tr>
                  <th className="team-th-checkbox">
                    <input type="checkbox" className="team-checkbox" />
                  </th>
                  <th className="team-th-name">
                    <div className="team-th-content">
                      Name
                      <MdKeyboardArrowDown size={16} className="team-sort-icon" />
                    </div>
                  </th>
                  <th className="team-th-contact">Contact</th>
                  <th className="team-th-rating">
                    <div className="team-th-content">
                      Rating
                      <MdKeyboardArrowDown size={16} className="team-sort-icon" />
                    </div>
                  </th>
                  <th className="team-th-actions"></th>
                </tr>
              </thead>
              <tbody className="team-table-body">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="team-table-row">
                      <td className="team-td-checkbox">
                        <input type="checkbox" className="team-checkbox" />
                      </td>
                      <td className="team-td-name">
                        <div className="team-member-info">
                          <div
                            className="team-avatar-placeholder"
                            style={{
                              backgroundColor: member.avatarBg,
                              color: member.avatarColor,
                            }}
                          >
                            {member.avatar}
                          </div>
                          <div className="team-member-details">
                            <div className="team-member-name">{member.name}</div>
                            {member.status && (
                              <div className="team-member-status">
                                <div className="team-status-dot"></div>
                                <span style={{ color: member.statusColor }}>
                                  {member.status}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="team-td-contact">
                        <div className="team-contact-info">
                          <a
                            href={`mailto:${member.email}`}
                            className="team-email-link"
                          >
                            {member.email}
                          </a>
                          <div className="team-phone">{member.phone}</div>
                        </div>
                      </td>
                      <td className="team-td-rating">
                        {member.rating === null ? (
                          <span className="team-no-reviews">No reviews yet</span>
                        ) : (
                          <div className="team-rating-info">
                            <span className="team-rating-score">
                              {member.rating.toFixed(1)}
                            </span>
                            <FaStar size={14} className="team-rating-star" />
                            <span className="team-review-count">
                              {member.reviewCount} reviews
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="team-td-actions">
                        <button className="team-actions-btn" onClick={() => { setEditEmployee(member); setShowEditModal(true); }}>
                          <span>Actions</span>
                          <MdKeyboardArrowDown size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="team-empty-state">
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;