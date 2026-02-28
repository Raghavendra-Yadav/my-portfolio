import { useState, useRef, useEffect, useCallback } from 'react';
import { FaComments, FaCheckCircle, FaHeart, FaArrowUp, FaReply } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface VotedComments {
    likes: string[];
    upvotes: string[];
}
type VoteType = 'like' | 'upvote';

interface CommentType {
    _id: string;
    name: string;
    comment: string;
    createdAt: string;
    likes: number;
    upvotes: number;
    parentId?: string;
}

// --- Custom Hook for robust state & interactions ---
function useCommentSystem(postId: string) {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [votedComments, setVotedComments] = useState<VotedComments>({
        likes: [],
        upvotes: [],
    });
    const [votingInProgress, setVotingInProgress] = useState<Record<string, boolean>>({});

    const userIdRef = useRef<string>('');

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem('userId', userId);
        }
        userIdRef.current = userId;

        const storedVotes = localStorage.getItem(`votes_${postId}_${userId}`);
        if (storedVotes) {
            try {
                setVotedComments(JSON.parse(storedVotes));
            } catch (e) {
                console.error("Failed to parse cached votes");
            }
        }
    }, [postId]);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/comments?postId=${postId}`);
            const data = await res.json();
            setComments(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch comments", err);
            setComments([]);
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const submitComment = async (form: { name: string; email: string; comment: string; parentId?: string }) => {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, postId }),
        });
        if (!response.ok) throw new Error("Comment submission failed");

        await fetchComments();
        return response.json();
    };

    const toggleVote = async (commentId: string, type: VoteType) => {
        const userId = userIdRef.current;
        if (!userId) return;

        const voteKey = `${commentId}_${type}`;
        if (votingInProgress[voteKey]) return;

        const voteTypeKey = type === 'like' ? 'likes' : 'upvotes';
        const hasVoted = votedComments[voteTypeKey].includes(commentId);
        const action = hasVoted ? 'remove' : 'add';

        setVotingInProgress(prev => ({ ...prev, [voteKey]: true }));

        const previousComments = [...comments];
        const previousVotedComments = { ...votedComments };

        const nextVotedComments = {
            ...votedComments,
            [voteTypeKey]: action === 'add'
                ? [...votedComments[voteTypeKey], commentId]
                : votedComments[voteTypeKey].filter((id) => id !== commentId),
        };

        setVotedComments(nextVotedComments);
        localStorage.setItem(`votes_${postId}_${userId}`, JSON.stringify(nextVotedComments));

        setComments(prev =>
            prev.map(c => {
                if (c._id === commentId) {
                    return {
                        ...c,
                        [voteTypeKey]: Math.max(0, (c[voteTypeKey] || 0) + (action === 'add' ? 1 : -1)),
                    };
                }
                return c;
            })
        );

        try {
            const response = await fetch(`/api/comments/${commentId}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, action }),
            });

            if (!response.ok) throw new Error('Voting failed on server');
        } catch (error) {
            console.error('Network Error during vote:', error);
            setComments(previousComments);
            setVotedComments(previousVotedComments);
            localStorage.setItem(`votes_${postId}_${userId}`, JSON.stringify(previousVotedComments));
        } finally {
            setVotingInProgress(prev => ({ ...prev, [voteKey]: false }));
        }
    };

    return {
        comments,
        loading,
        submitComment,
        toggleVote,
        votedComments,
        votingInProgress
    };
}

// --- UI Components ---
const GradientAvatar = ({ name }: { name: string }) => (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white flex items-center justify-center font-bold text-lg shadow border-2 border-white dark:border-gray-900 transition-all select-none">
        {name?.charAt(0)?.toUpperCase() || '?'}
    </div>
);

const AnimatedSpinner = () => (
    <div className="flex justify-center py-8">
        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
    </div>
);

const AnimatedSuccess = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-6"
    >
        <FaCheckCircle className="text-green-500 mb-2 drop-shadow-sm" size={32} />
        <p className="text-green-600 dark:text-green-400 font-medium text-center">
            Comment submitted easily!
        </p>
    </motion.div>
);

const CommentForm = ({
    onSubmit,
    parentId = null,
    onCancel = null
}: {
    onSubmit: (form: { name: string; email: string; comment: string; parentId?: string }) => Promise<void>;
    parentId?: string | null;
    onCancel?: (() => void) | null;
}) => {
    const [form, setForm] = useState({ name: '', email: '', comment: '' });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const dataToSubmit: any = { ...form };
            if (parentId) {
                dataToSubmit.parentId = parentId;
            }
            await onSubmit(dataToSubmit);
            setSubmitted(true);
            setForm({ name: '', email: '', comment: '' });
            setTimeout(() => {
                setSubmitted(false);
                if (onCancel) onCancel(); // Auto close reply form on success
            }, 2500);
        } catch (_err) {
            alert("Sorry, there was an issue posting your comment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) return <AnimatedSuccess />;

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${parentId ? 'mt-4 border-l-2 border-indigo-200 dark:border-indigo-900/50 pl-4 py-2' : ''}`} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    placeholder="Name *"
                    className="w-full border-0 ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    placeholder="Email * (private)"
                    className="w-full border-0 ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                    onChange={handleChange}
                />
            </div>
            <textarea
                name="comment"
                required
                value={form.comment}
                placeholder={parentId ? "Write a reply..." : "What are your thoughts?"}
                className="w-full border-0 ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow min-h-[100px] resize-y"
                onChange={handleChange}
                maxLength={500}
            />

            <div className="flex items-center gap-3">
                <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-indigo-500/20 transition-all flex justify-center items-center"
                >
                    {submitting ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                    ) : (
                        parentId ? "Post Reply" : "Post Comment"
                    )}
                </motion.button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium px-4 py-2 transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default function CommentSection({ postId }: { postId: string }) {
    const {
        comments, loading, submitComment, toggleVote, votedComments, votingInProgress
    } = useCommentSystem(postId);

    const [replyingTo, setReplyingTo] = useState<string | null>(null);

    // Group comments into trees
    const rootComments = comments.filter(c => !c.parentId);
    const repliesMap = comments.reduce((acc, comment) => {
        if (comment.parentId) {
            if (!acc[comment.parentId]) {
                acc[comment.parentId] = [];
            }
            acc[comment.parentId].push(comment);
        }
        return acc;
    }, {} as Record<string, CommentType[]>);

    const renderCommentNode = (c: CommentType, depth = 0) => {
        const isReply = depth > 0;
        const commentReplies = repliesMap[c._id] || [];

        return (
            <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 mb-6 ${isReply ? 'ml-6 sm:ml-10 mt-6' : 'mt-8'}`}
            >
                <div className="flex flex-col items-center">
                    <GradientAvatar name={c.name} />
                    {/* Thread connecting line for replies */}
                    {(commentReplies.length > 0 || isReply) && (
                        <div className="w-px h-full bg-gray-200 dark:bg-gray-800 mt-2"></div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="p-4 bg-gray-50/50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm">
                                {c.name}
                            </span>
                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                                {new Date(c.createdAt).toLocaleDateString('en-US', {
                                    month: 'short', day: 'numeric', year: 'numeric'
                                })}
                            </span>
                        </div>

                        <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed break-words whitespace-pre-wrap mb-2">
                            {c.comment}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 mt-2 select-none">
                            <button
                                onClick={() => toggleVote(c._id, 'like')}
                                disabled={votingInProgress[`${c._id}_like`]}
                                className={`group flex items-center gap-1.5 px-2 py-1 -ml-2 rounded-full transition-all duration-200 ${votedComments.likes.includes(c._id)
                                    ? 'text-pink-600 bg-pink-50 dark:bg-pink-500/10'
                                    : 'text-gray-500 hover:text-pink-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    } ${votingInProgress[`${c._id}_like`] ? 'opacity-50 touch-none pointer-events-none' : ''}`}
                            >
                                <motion.div whileTap={{ scale: 0.8 }}>
                                    <FaHeart size={14} className={votedComments.likes.includes(c._id) ? 'text-pink-500' : ''} />
                                </motion.div>
                                <span className="text-xs font-semibold">{c.likes || 0}</span>
                            </button>

                            <button
                                onClick={() => toggleVote(c._id, 'upvote')}
                                disabled={votingInProgress[`${c._id}_upvote`]}
                                className={`group flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-200 ${votedComments.upvotes.includes(c._id)
                                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10'
                                    : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    } ${votingInProgress[`${c._id}_upvote`] ? 'opacity-50 touch-none pointer-events-none' : ''}`}
                            >
                                <motion.div whileTap={{ scale: 0.8 }}>
                                    <FaArrowUp size={14} className={votedComments.upvotes.includes(c._id) ? 'text-indigo-500' : ''} />
                                </motion.div>
                                <span className="text-xs font-semibold">{c.upvotes || 0}</span>
                            </button>

                            {/* Reply Button - Disable creating too deep nesting, max depth 2 */}
                            {depth < 2 && (
                                <button
                                    onClick={() => setReplyingTo(replyingTo === c._id ? null : c._id)}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-full text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200"
                                >
                                    <FaReply size={12} />
                                    <span className="text-xs font-semibold">Reply</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Reply Form */}
                    <AnimatePresence>
                        {replyingTo === c._id && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="overflow-hidden"
                            >
                                <CommentForm
                                    onSubmit={submitComment}
                                    parentId={c._id}
                                    onCancel={() => setReplyingTo(null)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Render Children Recursively */}
                    {commentReplies.length > 0 && (
                        <div className="relative">
                            {commentReplies.map(reply => renderCommentNode(reply, depth + 1))}
                        </div>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <section className="mt-16 mb-24 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-8 px-2 md:px-0">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl text-indigo-600 dark:text-indigo-400">
                    <FaComments size={24} />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight">Discussion</h2>
                <span className="ml-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
                    {comments.length}
                </span>
            </div>

            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-indigo-50 dark:border-gray-800 rounded-[2rem] shadow-xl p-6 md:p-10 transition-all">

                {/* --- Submission Form --- */}
                <div className="mb-10 pb-10 border-b-2 border-dashed border-gray-100 dark:border-gray-800/80">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                        Leave a Reply
                    </h3>
                    <CommentForm onSubmit={submitComment} />
                </div>

                {/* --- Comments Display --- */}
                {loading ? (
                    <AnimatedSpinner />
                ) : comments.length === 0 ? (
                    <div className="py-12 bg-gray-50 dark:bg-gray-800/30 rounded-2xl text-center border border-dashed border-gray-200 dark:border-gray-700">
                        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <FaComments size={24} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No comments yet</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {rootComments.map(c => renderCommentNode(c))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
}
