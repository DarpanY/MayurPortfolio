import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getMessages, deleteMessage } from "../api/contactApi";
import { getServices, createService, deleteService, addWork, deleteWork } from "../api/serviceApi";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("services");
  const [messages, setMessages] = useState([]);
  const [services, setServices] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewType, setPreviewType] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState("");
  const [expandedService, setExpandedService] = useState(null);
  const [workFile, setWorkFile] = useState(null);
  const [workTitle, setWorkTitle] = useState("");
  const [workPreview, setWorkPreview] = useState(null);
  const [workPreviewType, setWorkPreviewType] = useState("");
  const [workUploading, setWorkUploading] = useState(false);
  const fileRef = useRef();
  const workFileRef = useRef();

  useEffect(() => {
    fetchMessages();
    fetchServices();
  }, []);

  const fetchMessages = async () => { try { setMessages(await getMessages()); } catch {} };
  const fetchServices = async () => { try { setServices(await getServices()); } catch {} };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    setFile(f);
    setPreviewType(f.type.startsWith("video/") ? "video" : "image");
    setPreview(URL.createObjectURL(f));
  };

  const handleWorkFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    setWorkFile(f);
    setWorkPreviewType(f.type.startsWith("video/") ? "video" : "image");
    setWorkPreview(URL.createObjectURL(f));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!file) return showToast("⚠️ Please choose a media file");
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("media", file);
    setUploading(true);
    try {
      const newService = await createService(fd);
      setServices((prev) => [newService, ...prev]);
      setForm({ title: "", description: "" });
      setFile(null); setPreview(null);
      fileRef.current.value = "";
      showToast("✅ Service added!");
    } catch { showToast("❌ Upload failed."); }
    finally { setUploading(false); }
  };

  const handleAddWork = async (serviceId) => {
    if (!workFile) return showToast("⚠️ Please choose a media file");
    const fd = new FormData();
    fd.append("media", workFile);
    fd.append("workTitle", workTitle);
    setWorkUploading(true);
    try {
      const updated = await addWork(serviceId, fd);
      setServices((prev) => prev.map((s) => s._id === serviceId ? updated : s));
      setWorkFile(null); setWorkTitle(""); setWorkPreview(null);
      if (workFileRef.current) workFileRef.current.value = "";
      showToast("✅ Work added!");
    } catch { showToast("❌ Upload failed."); }
    finally { setWorkUploading(false); }
  };

  const handleDeleteWork = async (serviceId, workId) => {
    if (!window.confirm("Delete this work?")) return;
    try {
      const updated = await deleteWork(serviceId, workId);
      setServices((prev) => prev.map((s) => s._id === serviceId ? updated : s));
      showToast("🗑️ Work deleted");
    } catch { showToast("❌ Could not delete"); }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service and ALL its works?")) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      showToast("🗑️ Deleted");
    } catch { showToast("❌ Could not delete"); }
  };

  const handleDeleteMessage = async (id) => {
    await deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div className="dashboard">
      <AnimatePresence>
        {toast && (
          <motion.div className="dash-toast"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        <div className="dash-header">
          <h1 className="dash-title">Admin Dashboard</h1>
          <div className="dash-tabs">
            <button className={`dash-tab ${tab === "services" ? "active" : ""}`} onClick={() => setTab("services")}>🎨 Services</button>
            <button className={`dash-tab ${tab === "messages" ? "active" : ""}`} onClick={() => setTab("messages")}>
              💬 Messages {messages.length > 0 && <span className="msg-badge">{messages.length}</span>}
            </button>
          </div>
          <button className="logout-btn" onClick={() => { localStorage.removeItem("token"); navigate("/admin"); }}>Logout →</button>
        </div>

        {tab === "services" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="upload-card glass">
              <h2>Add New Service</h2>
              <form className="upload-form" onSubmit={handleCreate}>
                <div className="form-row">
                  <input type="text" placeholder="Service Title (e.g. Capcut)"
                    value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                  <input type="text" placeholder="Short Description"
                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                </div>
                <div className={`drop-zone ${preview ? "has-preview" : ""}`} onClick={() => fileRef.current.click()}>
                  {preview ? (
                    previewType === "video"
                      ? <video src={preview} muted autoPlay loop playsInline className="drop-preview" />
                      : <img src={preview} alt="preview" className="drop-preview" />
                  ) : (
                    <div className="drop-placeholder">
                      <span className="drop-icon">📁</span>
                      <p>Click to upload service thumbnail</p>
                      <small>Image or Video (JPG, PNG, MP4, MOV…)</small>
                    </div>
                  )}
                  {preview && <div className="drop-change-overlay"><span>Click to change</span></div>}
                </div>
                <input ref={fileRef} type="file" accept="image/*,video/*" onChange={handleFile} style={{ display: "none" }} />
                <button className="primary-btn upload-btn" type="submit" disabled={uploading}>
                  {uploading ? <><span className="spinner" /> Uploading…</> : "Upload & Add Service"}
                </button>
              </form>
            </div>

            <h2 className="section-sub">Current Services ({services.length})</h2>

            {services.length === 0 ? (
              <p className="empty-msg">No services yet. Add one above ↑</p>
            ) : (
              <div className="srv-grid">
                {services.map((srv) => (
                  <motion.div className="srv-card glass" key={srv._id} layout
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="srv-thumb">
                      {srv.mediaType === "video"
                        ? <video src={srv.videoUrl} muted autoPlay loop playsInline />
                        : <img src={srv.imageUrl} alt={srv.title} />}
                      <span className="srv-type-badge">{srv.mediaType === "video" ? "🎬 Video" : "🖼️ Image"}</span>
                    </div>
                    <div className="srv-info">
                      <h3>{srv.title}</h3>
                      <p>{srv.description}</p>
                      <span className="srv-works-count">{(srv.works || []).length} work{(srv.works || []).length !== 1 ? "s" : ""}</span>
                    </div>

                    <div className="srv-works-section">
                      <button className="works-toggle-btn"
                        onClick={() => setExpandedService(expandedService === srv._id ? null : srv._id)}>
                        {expandedService === srv._id ? "▲ Hide Works" : "▼ Manage Works"}
                      </button>

                      <AnimatePresence>
                        {expandedService === srv._id && (
                          <motion.div className="works-manager"
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                            <div className="work-upload-row">
                              <input type="text" placeholder="Work title (optional)"
                                value={workTitle} onChange={(e) => setWorkTitle(e.target.value)}
                                className="work-title-input" />
                              <div className="work-drop-zone" onClick={() => workFileRef.current.click()}>
                                {workPreview ? (
                                  workPreviewType === "video"
                                    ? <video src={workPreview} muted autoPlay loop playsInline className="work-drop-preview" />
                                    : <img src={workPreview} alt="preview" className="work-drop-preview" />
                                ) : <span>📁 Click to pick work media</span>}
                              </div>
                              <input ref={workFileRef} type="file" accept="image/*,video/*"
                                onChange={handleWorkFile} style={{ display: "none" }} />
                              <button className="primary-btn work-upload-btn"
                                onClick={() => handleAddWork(srv._id)}
                                disabled={workUploading || !workFile}>
                                {workUploading ? <><span className="spinner" /> Uploading…</> : "+ Add Work"}
                              </button>
                            </div>

                            {(srv.works || []).length === 0 ? (
                              <p className="no-works-msg">No works yet — add some above!</p>
                            ) : (
                              <div className="works-thumb-grid">
                                {(srv.works || []).map((work) => (
                                  <div className="work-thumb-item" key={work._id}>
                                    {work.mediaType === "video"
                                      ? <video src={work.url} muted autoPlay loop playsInline />
                                      : <img src={work.url} alt={work.title || "work"} />}
                                    {work.title && <span className="work-thumb-title">{work.title}</span>}
                                    <button className="work-delete-btn" onClick={() => handleDeleteWork(srv._id, work._id)}>✕</button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button className="delete-btn" onClick={() => handleDeleteService(srv._id)}>🗑️ Delete Service</button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {tab === "messages" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="section-sub">Contact Messages ({messages.length})</h2>
            {messages.length === 0 ? (
              <p className="empty-msg">No messages yet.</p>
            ) : (
              <div className="messages-grid">
                {messages.map((msg) => (
                  <div className="message-card glass" key={msg._id}>
                    <h3>{msg.name}</h3>
                    <p className="msg-email">{msg.email}</p>
                    <p>{msg.message}</p>
                    <button className="delete-btn" onClick={() => handleDeleteMessage(msg._id)}>🗑️ Delete</button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;