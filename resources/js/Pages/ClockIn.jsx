import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Clock from '@/Components/Clock';

const ClockIn = () => {
    const [time, setTime] = useState('');
    const [ssn6, setSsn6] = useState('');

    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [actionType, setActionType] = useState('in');

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const signatureCanvasRef = useRef(null);






    // Fetch server time
    useEffect(() => {
        const fetchTime = async () => {
            try {
                const { data } = await axios.get('/clock');
                const [hour, minute] = data.time.split(':').map(Number);
                const now = new Date();
                now.setHours(hour, minute, 0);
                const formatted = new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZone: 'America/New_York',
                }).format(now);
                setTime(formatted);
            } catch (err) {
                console.error('Time fetch error:', err);
            }
        };
        fetchTime();
        const interval = setInterval(fetchTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Load camera when popup is shown
    useEffect(() => {
        if (showPopup) loadCamera();
    }, [showPopup]);

    // Handle camera countdown
    useEffect(() => {
        let timer;
        if (showPopup && videoRef.current && canvasRef.current) {
            setCountdown(5);
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev > 1) return prev - 1;
                    if (prev === 1) return 'Smile!';
                    clearInterval(timer);
                    takePicture();
                    return null;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showPopup]);

    // Signature canvas drawing
    useEffect(() => {
        if (!showSignatureModal || !signatureCanvasRef.current) return;
        const canvas = signatureCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = 200;
        };
        resizeCanvas();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        let isDrawing = false;
        let lastX = 0, lastY = 0;

        const getPosition = (e) => {
            const rect = canvas.getBoundingClientRect();
            return e.touches?.length
                ? [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top]
                : [e.offsetX, e.offsetY];
        };

        const start = (e) => {
            e.preventDefault();
            isDrawing = true;
            [lastX, lastY] = getPosition(e);
        };

        const draw = (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            const [x, y] = getPosition(e);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            [lastX, lastY] = [x, y];
        };

        const stop = () => isDrawing = false;

        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stop);
        canvas.addEventListener('mouseout', stop);
        canvas.addEventListener('touchstart', start, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stop);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            canvas.removeEventListener('mousedown', start);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stop);
            canvas.removeEventListener('mouseout', stop);
            canvas.removeEventListener('touchstart', start);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', stop);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [showSignatureModal]);

    const handleClockInOut = async (e) => {
        e.preventDefault();
        setError(null);



        try {
            const { data } = await axios.post('/validate-ssn', { tc_emp_ssn6: ssn6 });
            if (data.valid) {
                setActionType(data.isClockedIn ? 'out' : 'in');
                setShowPopup(true);
            } else {
                setError('Invalid SSN.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'SSN validation failed.');
        }
    };

    const loadCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch(console.error);
    };

    const takePicture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const timestamp = new Date().toLocaleString('en-US', {
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true, month: '2-digit', day: '2-digit', year: 'numeric',
            timeZone: 'America/New_York',
        });

        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(timestamp, canvas.width - 250, canvas.height - 20);

        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('tc_emp_ssn6', ssn6);
            formData.append('tc_timecard_start', time);
            formData.append('photo', blob, `${timestamp.replace(/[:\s]/g, '-')}_${ssn6}.jpg`);
            formData.append('type', actionType);

            axios.post('/timecard', formData)
                .then(() => {
                    setShowPopup(false);
                    setShowSignatureModal(true);
                })
                .catch((err) => {
                    console.error('Timecard error:', err);
                    setError('Timecard submission failed.');
                    setShowPopup(false);
                });
        }, 'image/jpeg');

        const stream = video.srcObject;
        stream?.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    };

    const saveSignature = () => {
        const canvas = signatureCanvasRef.current;
        if (!canvas) return;

        const image = canvas.toDataURL('image/png');

        axios.post('/save-signature', {
            tc_emp_ssn6: ssn6,
            signature: image,
            type: actionType,
        })
            .then(() => {
                setShowSignatureModal(false);
                alert('Signature saved. Process complete.');
            })
            .catch((err) => {
                console.error('Signature error:', err);
                setError('Failed to save signature.');
            });
    };

    return (
        <div className="p-6 bg-white shadow rounded max-w-xl mx-auto mt-10">
            <Clock />
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">
                Clock {actionType === 'in' ? 'In' : 'Out'}
            </h2>

            <form onSubmit={handleClockInOut} className="space-y-4 text-center">
                <input
                    type="text"
                    value={ssn6}
                    onChange={(e) => setSsn6(e.target.value)}
                    placeholder="Enter Last 6 Digits of SSN"
                    className="p-2 border rounded w-full text-center"
                    required
                    maxLength="6"
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Clock {actionType === 'in' ? 'In' : 'Out'}
                </button>
            </form>

            {/* Camera Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="relative">
                        <video ref={videoRef} autoPlay width="640" height="480" className="rounded" />
                        {countdown && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                                <h1 className="text-white text-6xl font-bold">{countdown}</h1>
                            </div>
                        )}
                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    </div>
                </div>
            )}

            {/* Signature Modal */}
            {showSignatureModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-2/3">
                        <h2 className="text-lg font-semibold mb-2">Please Sign Below</h2>
                        <canvas
                            ref={signatureCanvasRef}
                            className="border border-gray-300 w-full"
                            style={{ height: '200px' }}
                        />
                        <button
                            onClick={saveSignature}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Save Signature
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClockIn;
